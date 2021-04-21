import jwt from 'jsonwebtoken';
import databaseUtils from './db/database.js';
import { TABLES, STATUS_CODE } from './constants.js';

const createJWTToken = (user) => {
  const token = jwt.sign(
    { id: user.id, publicName: user.publicName, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    }
  );
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

const createAddSuccessResponse = (id, url) => {
  return {
    id,
    url,
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

const checkInputValidation = async (schema, schemaParams) => {
  await schema.validate(schemaParams);
  return true;
};

const isInTestMode = () => {
  return process.env.JEST_WORKER_ID;
};

const updateStatistics = (language, columnToChange, isIncrease = true) => {
  const Statistics = databaseUtils().loadModel(TABLES.STATISTICS_TABLE);
  const incrPart = {};
  incrPart[columnToChange] = isIncrease ? 1 : -1;
  return Statistics.increment(incrPart, { where: { language } });
};

export {
  checkInputValidation,
  createJWTToken,
  findUserByName,
  findUserByEmail,
  createValidationResponse,
  createSuccessResponse,
  isInTestMode,
  createAuthorizationErrorResponse,
  createInputErrorResponse,
  findUserById,
  createAddSuccessResponse,
  updateStatistics,
};
