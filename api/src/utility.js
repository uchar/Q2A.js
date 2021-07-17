import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import databaseUtils from './db/database.js';
import { TABLES, STATUS_CODE, POST_TYPES } from './constants.js';

const { Op } = Sequelize;
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
  try {
    await schema.validate(schemaParams);
  } catch (e) {
    return createValidationResponse(e.errors[0]);
  }
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
const findTag = async (language, title) => {
  const Tag = await databaseUtils().loadModel(TABLES.TAG_TABLE);
  return Tag.findOne({
    where: {
      language,
      title,
    },
  });
};

const getTypeTagWhereClause = (language, type, tag) => {
  if (tag) {
    return {
      type,
      active: 1,
      language,
      [Op.or]: [{ tag1: tag }, { tag2: tag }, { tag3: tag }, { tag4: tag }, { tag5: tag }],
    };
  }
  return { type, language, active: 1 };
};

const getQuestionsOrderBy = async (language, tag, order, limit, offset, augmentWhereClause = undefined) => {
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);

  let tagWhereClause = getTypeTagWhereClause(language, POST_TYPES.QUESTION, tag);
  if (augmentWhereClause) {
    tagWhereClause = augmentWhereClause(tagWhereClause);
  }

  return Post.findAll({
    where: tagWhereClause,
    order,
    include: [User],
    limit,
    offset,
  });
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
  findTag,
  getQuestionsOrderBy,
};
