import {
  getAnswers,
  getComments,
  getLatestQuestions,
  getMostViewsQuestions,
  getNoAnswersQuestions,
  getPopularQuestions,
  getQuestion,
  getUserAnswers,
  getUserClapItems,
  getUserQuestions,
} from '../queries/post.js';
import { addBlogPost } from '../mutations/blog.js';
import { getAllTags, getTagDetail } from '../queries/tag.js';
import { getUser } from '../queries/user.js';
import { getNotifications } from '../queries/notifications.js';
import { updateUser } from '../mutations/user.js';
import { setReadAllNotifications } from '../mutations/notifications.js';
import { googleLogin, login, signUp } from '../mutations/login.js';
import {
  addAnswer,
  addComment,
  addQuestion,
  updateAnswer,
  updateComment,
  updateQuestion,
  increaseQuestionViewCount,
  togglePostActiveStatus,
} from '../mutations/post.js';
import { getStatistics } from '../queries/statistic.js';
import { getBlogPosts } from '../queries/blog.js';
import { getUploadLink } from '../queries/upload.js';

export default {
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
    getBlogPosts,
    getStatistics,
    getUploadLink,
  },
  Mutation: {
    login,
    signUp,
    addQuestion,
    googleLogin,
    updateUser,
    updateQuestion,
    updateAnswer,
    updateComment,
    addAnswer,
    addComment,
    setReadAllNotifications,
    addBlogPost,
    increaseViewCount: increaseQuestionViewCount,
    togglePostActiveStatus,
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
