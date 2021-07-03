import Sequelize from 'sequelize';
import databaseUtils from '../db/database.js';
import { POST_TYPES, TABLES } from '../constants.js';
import { getQuestionsOrderBy } from '../utility.js';

const { Op } = Sequelize;

const getLatestQuestions = async (_, { language, tag, limit, offset }) => {
  return getQuestionsOrderBy(language, tag, [['createdAt', 'DESC']], limit, offset);
};

const getPopularQuestions = async (_, { language, tag, limit, offset }) => {
  return getQuestionsOrderBy(language, tag, [['votesCount', 'DESC']], limit, offset);
};

const getMostViewsQuestions = async (_, { language, tag, limit, offset }) => {
  return getQuestionsOrderBy(language, tag, [['viewsCount', 'DESC']], limit, offset);
};

const getNoAnswersQuestions = async (_, { language, tag, limit, offset }) => {
  return getQuestionsOrderBy(language, tag, [['createdAt', 'DESC']], limit, offset, (whereClause) => {
    const newWhereClause = whereClause;
    newWhereClause.answersCount = 0;
    return newWhereClause;
  });
};

const getQuestion = async (_, { language, id }) => {
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);

  const question = await Post.findOne({
    where: {
      language,
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
    where: { type: POST_TYPES.ANSWER, parentId: id },
    include: [User],
    order: [['votesCount', 'DESC']],
  });
  return answers;
};

const getComments = async ({ id }) => {
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const comments = await Post.findAll({
    where: { type: POST_TYPES.COMMENT, parentId: id },
    include: [User],
    order: [['createdAt', 'ASC']],
  });
  return comments;
};

const getUserQuestions = async ({ id, language }) => {
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
  const questions = await Post.findAll({
    where: { type: POST_TYPES.QUESTION, userId: id, language },
    order: [['createdAt', 'DESC']],
    limit: 30,
    offset: 0,
  });
  return questions;
};

const getUserAnswers = async ({ id, language }) => {
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
  const answers = await Post.findAll({
    where: { type: POST_TYPES.ANSWER, userId: id, language },
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
    where: { [Op.or]: [{ type: POST_TYPES.QUESTION }, { type: POST_TYPES.ANSWER }] },
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
