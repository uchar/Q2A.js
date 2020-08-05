const { Op } = require('sequelize');
const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;
const postTypes = require('../db/constants').POST_TYPES;

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
  const Post = database.loadModel(tables.POST_TABLE);
  const User = database.loadModel(tables.USER_TABLE);

  let tagWhereClause = getTypeTagWhereClause(postTypes.QUESTION, tag);
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
module.exports.getLatestQuestions = async (_, { tag, limit, offset }) => {
  return getQuestionsOrderBy(tag, [['createdAt', 'DESC']], limit, offset);
};

module.exports.getPopularQuestions = async (parent, { tag, limit, offset }) => {
  return getQuestionsOrderBy(tag, [['votesCount', 'DESC']], limit, offset);
};

module.exports.getMostViewsQuestions = async (parent, { tag, limit, offset }) => {
  return getQuestionsOrderBy(tag, [['viewsCount', 'DESC']], limit, offset);
};

module.exports.getNoAnswersQuestions = async (parent, { tag, limit, offset }) => {
  return getQuestionsOrderBy(tag, [['createdAt', 'DESC']], limit, offset, (whereClause) => {
    const newWhereClause = whereClause;
    newWhereClause.answersCount = 0;
    return newWhereClause;
  });
};

module.exports.getQuestion = async (parent, { id }) => {
  const Post = await database.loadModel(tables.POST_TABLE);
  const User = database.loadModel(tables.USER_TABLE);

  const question = await Post.findOne({
    where: {
      type: postTypes.QUESTION,
      id,
    },
    include: [User],
  });
  return question;
};

module.exports.getAnswers = async ({ id }) => {
  const Post = database.loadModel(tables.POST_TABLE);
  const User = database.loadModel(tables.USER_TABLE);
  const answers = await Post.findAll({
    where: {
      type: postTypes.ANSWER,
      parentId: id,
    },
    include: [User],
    order: [['votesCount', 'DESC']],
  });
  return answers;
};

module.exports.getComments = async ({ id }) => {
  const Post = database.loadModel(tables.POST_TABLE);
  const User = database.loadModel(tables.USER_TABLE);
  const comments = await Post.findAll({
    where: {
      type: postTypes.COMMENT,
      parentId: id,
    },
    include: [User],
    order: [['createdAt', 'ASC']],
  });
  return comments;
};

module.exports.getUserQuestions = async ({ id }) => {
  const Post = await database.loadModel(tables.POST_TABLE);
  const questions = await Post.findAll({
    where: {
      type: postTypes.QUESTION,
      userId: id,
    },
    order: [['createdAt', 'DESC']],
    limit: 30,
    offset: 0,
  });
  return questions;
};

module.exports.getUserAnswers = async ({ id }) => {
  const Post = await database.loadModel(tables.POST_TABLE);

  const answers = await Post.findAll({
    where: {
      type: postTypes.ANSWER,
      userId: id,
    },
    order: [['createdAt', 'DESC']],
    limit: 30,
    offset: 0,
  });
  return answers;
};

module.exports.getUserClapItems = async ({ id }) => {
  const Post = await database.loadModel(tables.POST_TABLE);
  const Clap = await database.loadModel(tables.CLAP_TABLE);

  const result = await Post.findAll({
    raw: true,
    include: {
      model: Clap,
      where: { userId: id },
    },
    where: {
      [Op.or]: [{ type: postTypes.QUESTION }, { type: postTypes.ANSWER }],
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
        if (item.type === postTypes.QUESTION) {
          newItem.question[`${key}`] = item[key];
        } else if (item.type === postTypes.ANSWER) {
          newItem.answer[`${key}`] = item[key];
        }
      }
    });
    items.push(newItem);
  });

  return items;
};
