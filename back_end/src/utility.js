import hashEquals from 'hash-equals';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import databaseUtils from './db/database.js';
import { TABLES, STATUS_CODE } from './constants.js';

const createJWTToken = (user) => {
  const token = jwt.sign({ id: user.id, publicName: user.publicName }, process.env.JWT_SECRET, {
    expiresIn: '7d',
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
const findUserById = async (id) => {
  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  return User.findOne({
    where: {
      id,
    },
  });
};

const findUserByEmail = async (email) => {
  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
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

const createAuthorizationErrorResponse = (message = '') => {
  return {
    statusCode: STATUS_CODE.AUTHORIZATION_ERROR,
    message,
  };
};

const createInputErrorResponse = (message = '') => {
  return {
    statusCode: STATUS_CODE.INPUT_ERROR,
    message,
  };
};

const checkInputValidation = async (schema, schemaParams, context) => {
  if (context === null) {
    return createAuthorizationErrorResponse();
  }
  const user = await findUserById(context.user.id);
  if (!user) {
    return createValidationResponse();
  }

  try {
    await schema.validate(schemaParams);
    return true;
  } catch (e) {
    return createInputErrorResponse(e.message);
  }
};

const checkInputValidationWithoutContext = async (schema, schemaParams) => {
  await schema.validate(schemaParams);
  return true;
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
  checkInputValidation,
  createJWTToken,
  findUserByName,
  findUserByEmail,
  createValidationResponse,
  createSuccessResponse,
  legacyHash,
  isLegacyPasswordValid,
  isInTestMode,
  createAuthorizationErrorResponse,
  createInputErrorResponse,
  findUserById,
  checkInputValidationWithoutContext,
};
