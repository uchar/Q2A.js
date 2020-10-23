import hashEquals from 'hash-equals';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import databaseUtils from './db/database.js';
import { TABLES } from './db/constants.js';

const STATUS_CODE = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  OTHER_ERROR: 'OTHER_ERROR',
  SUCCESS: 'SUCCESS',
};

const LOGIN_STATUS_CODE = {
  NO_USER: 'User not found',
  INVALID_LOGIN: 'Username or password is wrong',
  GOOGLE_LOGIN_ERROR: 'We encountered error while trying to reach your account',
};

const createJWTToken = (user) => {
  const token = jwt.sign({ id: user.id, publicName: user.publicName }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

const findUserByName = async (publicName) => {
  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  return User.findOne({
    where: {
      publicName,
    },
  });
};

const findUserByEmail = async (email) => {
  console.log('1');
  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  console.log('2');
  return User.findOne({
    where: {
      email,
    },
  });
};

const createValidationResponse = (message) => {
  return {
    statusCode: STATUS_CODE.VALIDATION_ERROR,
    message,
  };
};

const createSuccessResponse = (message = '') => {
  return {
    statusCode: STATUS_CODE.SUCCESS,
    message,
  };
};

const createErrorResponse = (message = '') => {
  return {
    statusCode: this.STATUS_CODE.OTHER_ERROR,
    message,
  };
};

const legacyHash = (password, salt) => {
  return crypto
    .createHash('sha1')
    .update(salt.substr(0, 8) + password + salt.substr(8, salt.length))
    .digest();
};

const isLegacyPasswordValid = (password, salt, hashToCheckAgainst) => {
  return hashEquals(legacyHash(password, salt.toString()).toString(), hashToCheckAgainst.toString());
};

const isInTestMode = () => {
  return process.env.JEST_WORKER_ID;
};

export {
  STATUS_CODE,
  LOGIN_STATUS_CODE,
  createJWTToken,
  findUserByName,
  findUserByEmail,
  createValidationResponse,
  createSuccessResponse,
  legacyHash,
  isLegacyPasswordValid,
  isInTestMode,
  createErrorResponse,
};
