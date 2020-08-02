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
const { updateUser } = require('../mutations/user');
const { login, signUp, googleLogin } = require('../mutations/login');
const { addQuestion, updateQuestion } = require('../mutations/post');
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
    updateQuestion,
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
