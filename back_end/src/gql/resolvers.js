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
const { getUser, getNotifications } = require('../queries/user');
const { updateUser, setReadAllNotification } = require('../mutations/user');
const { login, signUp, googleLogin } = require('../mutations/login');
const {
  addQuestion,
  updateQuestion,
  addAnswer,
  addComment,
  updateAnswer,
  updateComment,
} = require('../mutations/post');
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
    getNotifications,
  },
  Mutation: {
    login,
    signUp,
    addQuestion,
    googleLogin,
    uploadFile,
    updateUser,
    updateQuestion,
    updateAnswer,
    updateComment,
    addAnswer,
    addComment,
    setReadAllNotification,
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
