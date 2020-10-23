import Sequelize from 'sequelize';
import databaseUtils from '../db/database.js';
import { POST_TYPES, TABLES } from '../db/constants.js';

const { Op } = Sequelize;

const getTypeTagWhereClause = (type, tag) => {
  if (tag) {
    return {
      type,
      [Op.or]: [{ tag1: tag }, { tag2: tag }, { tag3: tag }, { tag4: tag }, { tag5: tag }],
    };
  }
  return { type };
};

const getQuestionsOrderBy = async (tag, order, limit, offset, augmentWhereClause = undefined) => {
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);

  let tagWhereClause = getTypeTagWhereClause(POST_TYPES.QUESTION, tag);
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
const getLatestQuestions = async (_, { tag, limit, offset }) => {
  return getQuestionsOrderBy(tag, [['createdAt', 'DESC']], limit, offset);
};

const getPopularQuestions = async (parent, { tag, limit, offset }) => {
  return getQuestionsOrderBy(tag, [['votesCount', 'DESC']], limit, offset);
};

const getMostViewsQuestions = async (parent, { tag, limit, offset }) => {
  return getQuestionsOrderBy(tag, [['viewsCount', 'DESC']], limit, offset);
};

const getNoAnswersQuestions = async (parent, { tag, limit, offset }) => {
  return getQuestionsOrderBy(tag, [['createdAt', 'DESC']], limit, offset, (whereClause) => {
    const newWhereClause = whereClause;
    newWhereClause.answersCount = 0;
    return newWhereClause;
  });
};

const getQuestion = async (parent, { id }) => {
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);

  const question = await Post.findOne({
    where: {
      type: POST_TYPES.QUESTION,
      id,
    },
    include: [User],
  });
  return question;
};

const getAnswers = async ({ id }) => {
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const answers = await Post.findAll({
    where: {
      type: POST_TYPES.ANSWER,
      parentId: id,
    },
    include: [User],
    order: [['votesCount', 'DESC']],
  });
  return answers;
};

const getComments = async ({ id }) => {
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const comments = await Post.findAll({
    where: {
      type: POST_TYPES.COMMENT,
      parentId: id,
    },
    include: [User],
    order: [['createdAt', 'ASC']],
  });
  return comments;
};

const getUserQuestions = async ({ id }) => {
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
  const questions = await Post.findAll({
    where: {
      type: POST_TYPES.QUESTION,
      userId: id,
    },
    order: [['createdAt', 'DESC']],
    limit: 30,
    offset: 0,
  });
  return questions;
};

const getUserAnswers = async ({ id }) => {
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);

  const answers = await Post.findAll({
    where: {
      type: POST_TYPES.ANSWER,
      userId: id,
    },
    order: [['createdAt', 'DESC']],
    limit: 30,
    offset: 0,
  });
  return answers;
};

const getUserClapItems = async ({ id }) => {
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
  const Clap = await databaseUtils().loadModel(TABLES.CLAP_TABLE);

  const result = await Post.findAll({
    raw: true,
    include: {
      model: Clap,
      where: { userId: id },
    },
    where: {
      [Op.or]: [{ type: POST_TYPES.QUESTION }, { type: POST_TYPES.ANSWER }],
    },
    order: [['createdAt', 'DESC']],
    limit: 30,
    offset: 0,
  });

  const items = [];
  result.forEach((item) => {
    const newItem = { answer: {}, question: {}, type: item.type };
    Object.keys(item).forEach((key) => {
      if (!key.includes('.')) {
        if (item.type === POST_TYPES.QUESTION) {
          newItem.question[`${key}`] = item[key];
        } else if (item.type === POST_TYPES.ANSWER) {
          newItem.answer[`${key}`] = item[key];
        }
      }
    });
    items.push(newItem);
  });

  return items;
};

export {
  getLatestQuestions,
  getPopularQuestions,
  getMostViewsQuestions,
  getNoAnswersQuestions,
  getQuestion,
  getUserClapItems,
  getUserAnswers,
  getUserQuestions,
  getComments,
  getAnswers,
};
