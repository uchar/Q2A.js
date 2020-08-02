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
const { login, signUp, googleLogin, updateUser } = require('../mutations/user');
const { addQuestion } = require('../mutations/post');
const { uploadFile } = require('../mutations/upload');

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
    googleLogin,
    uploadFile,
    updateUser,
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
