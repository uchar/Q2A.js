import bcrypt from 'bcrypt';
import axios from 'axios';
import databaseUtils from '../db/database.js';
import { TABLES, LOGIN_STATUS_CODE } from '../constants.js';
import { createJWTToken, findUserByEmail, findUserByName, isLegacyPasswordValid } from '../utility.js';

const signUp = async (_, { email, username, password }) => {
  const newPasswordHash = await bcrypt.hash(password, 10);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  let user = await findUserByName(username);
  if (user) {
    throw new Error('User already exist');
  }
  user = await findUserByEmail(email);
  if (user) {
    throw new Error('Email already exist');
  }
  await User.create({
    publicName: username,
    email,
    password: newPasswordHash,
    isLegacyAuthentication: false,
    isEmailVerified: false,
  });
  user = await findUserByName(username);
  return createJWTToken(user);
};

const login = async (_, { username, password }) => {
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const user = await findUserByName(username);
  if (!user) {
    throw new Error(LOGIN_STATUS_CODE.NO_USER);
  }
  if (user.isLegacyAuthentication) {
    const isValid = isLegacyPasswordValid(password, user.legacyPasswordSalt, user.legacyPassword);
    if (isValid) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      await User.update(
        {
          password: newPasswordHash,
          isLegacyAuthentication: false,
          legacyPassword: null,
          legacyPasswordSalt: null,
        },
        { where: { id: user.id } }
      );
      return createJWTToken(user);
    }
    throw new Error(LOGIN_STATUS_CODE.INVALID_LOGIN);
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return createJWTToken(user);
    }
    throw new Error(LOGIN_STATUS_CODE.INVALID_LOGIN);
  }
};

const googleLogin = async (_, { jwtToken }) => {
  try {
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${jwtToken}`);
    if (response.status !== 200) {
      console.log('Wrong status in googleLogin', jwtToken, response);
      throw new Error(LOGIN_STATUS_CODE.GOOGLE_LOGIN_ERROR);
    }
    const googleIdData = response.data;
    console.log('googleIdData : ', googleIdData);
    if (googleIdData.aud !== process.env.GOOGLE_CLIENT_ID) {
      console.log('Wrong aud in googleLogin', jwtToken, response);
      throw new Error(LOGIN_STATUS_CODE.GOOGLE_LOGIN_ERROR);
    }
    const { email, name } = googleIdData;
    const publicName = name.replace(' ', '_');
    const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
    let user = await findUserByEmail(email);
    if (user) return createJWTToken(user);
    await User.create({
      publicName,
      email,
      isLegacyAuthentication: false,
      isEmailVerified: true,
    });
    user = await findUserByName(publicName);
    return createJWTToken(user);
  } catch (e) {
    console.log('Other error in googleLogin', jwtToken, e);
    throw new Error(e.toString());
  }
};

export { signUp, login, googleLogin };
