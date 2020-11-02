import bcrypt from 'bcrypt';
import axios from 'axios';
import * as yup from 'yup';
import databaseUtils from '../db/database.js';
import { TABLES, LOGIN_ERRORS, LANGUAGE } from '../constants.js';
import {
  createJWTToken,
  findUserByEmail,
  findUserByName,
  isLegacyPasswordValid,
  checkInputValidationWithoutContext,
} from '../utility.js';

const signUp = async (_, { email, username, password, language }) => {
  console.log('language:', language);
  const newPasswordHash = await bcrypt.hash(password, 10);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const loginUserSchema = await yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required().min(3, ''),
    password: yup.string().required().min(3, ''),
    language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]),
  });
  console.log('loginUserSchema:', loginUserSchema.email);
  await checkInputValidationWithoutContext(loginUserSchema, {
    email,
    username,
    password,
    language,
  });
  let user = await findUserByName(username);
  if (user) {
    throw new Error(LOGIN_ERRORS.EXIST_USER);
  }
  user = await findUserByEmail(email);
  if (user) {
    throw new Error(LOGIN_ERRORS.INVALID_LOGIN);
  }
  await User.create({
    email,
    publicName: username,
    password: newPasswordHash,
    language,
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
    throw new Error(LOGIN_ERRORS.NO_USER);
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
    throw new Error(LOGIN_ERRORS.INVALID_LOGIN);
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return createJWTToken(user);
    }
    throw new Error(LOGIN_ERRORS.INVALID_LOGIN);
  }
};

const googleLogin = async (_, { jwtToken }) => {
  try {
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${jwtToken}`);
    if (response.status !== 200) {
      console.log('Wrong status in googleLogin', jwtToken, response);
      throw new Error(LOGIN_ERRORS.GOOGLE_LOGIN_ERROR);
    }
    const googleIdData = response.data;
    console.log('googleIdData : ', googleIdData);
    if (googleIdData.aud !== process.env.GOOGLE_CLIENT_ID) {
      console.log('Wrong aud in googleLogin', jwtToken, response);
      throw new Error(LOGIN_ERRORS.GOOGLE_LOGIN_ERROR);
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
