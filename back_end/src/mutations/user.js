const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;
const { isLegacyPasswordValid, STATUS_CODES } = require('../utility');

const createJWTToken = (user) => {
  const token = jwt.sign({ id: user.id, publicName: user.publicName }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};
const findUserByName = async (publicName) => {
  const User = await database.loadModel(tables.USER_TABLE);
  return User.findOne({
    where: {
      publicName,
    },
  });
};

const findUserByEmail = async (email) => {
  const User = await database.loadModel(tables.USER_TABLE);
  return User.findOne({
    where: {
      email,
    },
  });
};

module.exports.signUp = async (_, { email, username, password }) => {
  const newPasswordHash = await bcrypt.hash(password, 10);
  const User = await database.loadModel(tables.USER_TABLE);
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

module.exports.login = async (_, { username, password }) => {
  const User = await database.loadModel(tables.USER_TABLE);
  const user = await findUserByName(username);
  if (!user) {
    throw new Error(STATUS_CODES.NO_USER);
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
    throw new Error(STATUS_CODES.INVALID_LOGIN);
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return createJWTToken(user);
    }
    throw new Error(STATUS_CODES.INVALID_LOGIN);
  }
};
