const { Op } = require('sequelize');
const dbUtils = require('./database').getUtils();
const tables = require('./database').getTables();
const postTypes = require('./database').getPostTypes();

const getTypeTagWhereClause = (type, tag) => {
  if (tag) {
    return {
      type,
      [Op.or]: [{ tag1: tag }, { tag2: tag }, { tag3: tag }, { tag4: tag }, { tag5: tag }],
    };
  }
  return { type };
};
module.exports.getLatestQuestions = async (_, { tag, limit, offset }) => {
  const Post = dbUtils.loadModel(tables.POST_TABLE);
  const User = dbUtils.loadModel(tables.USER_TABLE);

  const tagWhereClause = getTypeTagWhereClause(postTypes.QUESTION, tag);
  const questions = await Post.findAll({
    where: tagWhereClause,
    order: [['createdAt', 'DESC']],
    include: [User],
    limit,
    offset,
  });
  return questions;
};

module.exports.getPopularQuestions = async (parent, { tag, limit, offset }) => {
  const Post = dbUtils.loadModel(tables.POST_TABLE);
  const User = dbUtils.loadModel(tables.USER_TABLE);

  const tagWhereClause = getTypeTagWhereClause(postTypes.QUESTION, tag);
  const questions = await Post.findAll({
    where: tagWhereClause,
    order: [['votesCount', 'DESC']],
    include: [User],
    limit,
    offset,
  });
  return questions;
};

module.exports.getMostViewsQuestions = async (parent, { tag, limit, offset }) => {
  const Post = dbUtils.loadModel(tables.POST_TABLE);
  const User = dbUtils.loadModel(tables.USER_TABLE);

  const tagWhereClause = getTypeTagWhereClause(postTypes.QUESTION, tag);
  const questions = await Post.findAll({
    where: tagWhereClause,
    order: [['viewsCount', 'DESC']],
    include: [User],
    limit,
    offset,
  });
  return questions;
};

module.exports.getNoAnswersQuestions = async (parent, { tag, limit, offset }) => {
  const Post = dbUtils.loadModel(tables.POST_TABLE);
  const User = dbUtils.loadModel(tables.USER_TABLE);

  const tagWhereClause = getTypeTagWhereClause(postTypes.QUESTION, tag);
  tagWhereClause.answersCount = 0;
  const questions = await Post.findAll({
    where: tagWhereClause,
    order: [['createdAt', 'DESC']],
    include: [User],
    limit,
    offset,
  });
  return questions;
};

module.exports.getQuestion = async (parent, { id }) => {
  const Post = await dbUtils.loadModel(tables.POST_TABLE);
  const User = dbUtils.loadModel(tables.USER_TABLE);

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
  const Post = dbUtils.loadModel(tables.POST_TABLE);
  const User = dbUtils.loadModel(tables.USER_TABLE);
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
  const Post = dbUtils.loadModel(tables.POST_TABLE);
  const User = dbUtils.loadModel(tables.USER_TABLE);
  const comments = await Post.findAll({
    where: {
      type: postTypes.COMMENT,
      parentId: id,
    },
    include: [User],
    order: [['createdAt', 'DESC']],
  });
  return comments;
};

module.exports.getUserQuestions = async ({ id }) => {
  const Post = await dbUtils.loadModel(tables.POST_TABLE);
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
  const Post = await dbUtils.loadModel(tables.POST_TABLE);

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
  const Post = await dbUtils.loadModel(tables.POST_TABLE);
  const Clap = await dbUtils.loadModel(tables.CLAP_TABLE);

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
