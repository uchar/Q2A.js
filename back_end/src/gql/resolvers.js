const {
  getLatestQuestions,
  getPopularQuestions,
  getMostViewsQuestions,
  getNoAnswersQuestions,
  getQuestion,
  getAnswers,
  getComments,
  getUserAnswers,
  getUserClapItems,
  getUserQuestions,
} = require('../queries/post');
const { getAllTags, getTagDetail } = require('../queries/tag');
const { getUser } = require('../queries/user');
const { login, signUp } = require('../mutations/user');
const { addQuestion } = require('../mutations/post');

module.exports = {
  Query: {
    latestQuestions: getLatestQuestions,
    popularQuestions: getPopularQuestions,
    mostViewsQuestions: getMostViewsQuestions,
    noAnswersQuestions: getNoAnswersQuestions,
    getTags: getAllTags,
    getQuestion,
    getTagDetail,
    getUser,
  },
  Mutation: {
    login,
    signUp,
    addQuestion,
  },
  Question: {
    answers: getAnswers,
    comments: getComments,
  },
  User: {
    questions: getUserQuestions,
    answers: getUserAnswers,
    clapItems: getUserClapItems,
  },
  Answer: {
    comments: getComments,
  },
};
