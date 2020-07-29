const hashEquals = require('hash-equals');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const database = require('./db/database').getDatabase();
const tables = require('./db/constants').TABLES;

module.exports.STATUS_CODE = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  OTHER_ERROR: 'OTHER_ERROR',
  SUCCESS: 'SUCCESS',
};

module.exports.LOGIN_STATUS_CODE = {
  NO_USER: 'User not found',
  INVALID_LOGIN: 'Username or password is wrong',
  GOOGLE_LOGIN_ERROR: 'We encountered error while trying to reach your account',
};

module.exports.createJWTToken = (user) => {
  const token = jwt.sign({ id: user.id, publicName: user.publicName }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

module.exports.findUserByName = async (publicName) => {
  const User = await database.loadModel(tables.USER_TABLE);
  return User.findOne({
    where: {
      publicName,
    },
  });
};

module.exports.findUserByEmail = async (email) => {
  const User = await database.loadModel(tables.USER_TABLE);
  return User.findOne({
    where: {
      email,
    },
  });
};

module.exports.createValidationResponse = (message) => {
  return {
    statusCode: this.STATUS_CODE.VALIDATION_ERROR,
    message,
  };
};

module.exports.createSuccessResponse = (message = '') => {
  return {
    statusCode: this.STATUS_CODE.SUCCESS,
    message,
  };
};

const legacyHash = (password, salt) => {
  return crypto
    .createHash('sha1')
    .update(salt.substr(0, 8) + password + salt.substr(8, salt.length))
    .digest();
};

module.exports.isLegacyPasswordValid = (password, salt, hashToCheckAgainst) => {
  return hashEquals(legacyHash(password, salt.toString()).toString(), hashToCheckAgainst.toString());
};
