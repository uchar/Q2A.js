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

const createAddSuccessResponse = (id) => {
  return {
    id,
    statusCode: STATUS_CODE.SUCCESS,
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
  if (context === null || context.user === null || context.user.id === null) {
    throw new Error(STATUS_CODE.AUTHORIZATION_ERROR);
  }
  const user = await findUserById(context.user.id);
  if (!user) {
    throw new Error(STATUS_CODE.VALIDATION_ERROR);
  }

  await schema.validate(schemaParams);
  return true;
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
  isInTestMode,
  createAuthorizationErrorResponse,
  createInputErrorResponse,
  findUserById,
  checkInputValidationWithoutContext,
  createAddSuccessResponse,
};
