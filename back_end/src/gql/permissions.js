import { rule, shield, or } from 'graphql-shield';
import { ROLE, TABLES } from '../constants.js';
import databaseUtils from '../db/database.js';

const isPublic = rule({ cache: 'contextual' })(async () => {
  return true;
});

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx) => {
  return ctx.user !== null && ctx.user.role === ROLE.ADMIN;
});
const isSuperAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx) => {
  return ctx.user !== null && ctx.user.role === ROLE.SUPER_ADMIN;
});

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx) => {
  return ctx.user !== null;
});

const isAuthenticatedAndEmailConfirmed = rule({ cache: 'contextual' })(async (parent, args, ctx) => {
  return ctx.user !== null && ctx.user.role === ROLE.USER_CONFIRMED;
});

// eslint-disable-next-line complexity
const isSelf = rule({ cache: 'no_cache' })(async (parent, args, ctx, info) => {
  if (ctx.user === null) return false;
  const userId = ctx.user.id;
  const { fieldName } = info;
  if (['updateAnswer', 'updateQuestion', 'updateComment'].includes(fieldName)) {
    const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
    const post = await Post.findOne({
      where: {
        userId,
        id: args.id,
      },
    });
    if (!post) return false;
  } else if (['updateUser'].includes(fieldName)) {
    if (args.id !== userId) return false;
  } else if (['getNotifications'].includes(fieldName)) {
    if (!userId) return false;
  } else {
    return false;
  }
  return true;
});

const permissions = shield({
  Query: {
    latestQuestions: isPublic,
    popularQuestions: isPublic,
    mostViewsQuestions: isPublic,
    noAnswersQuestions: isPublic,
    getTags: isPublic,
    getTagDetail: isPublic,
    getQuestion: isPublic,
    getUser: isPublic,
    getNotifications: isSelf,
    getBlogPosts: isPublic,
  },
  Mutation: {
    login: isPublic,
    googleLogin: isPublic,
    signUp: isPublic,
    addQuestion: or(isSuperAdmin, isAdmin, isAuthenticatedAndEmailConfirmed),
    addBlogPost: or(isSuperAdmin, isAdmin, isAuthenticatedAndEmailConfirmed),
    addAnswer: or(isSuperAdmin, isAdmin, isAuthenticatedAndEmailConfirmed),
    addComment: or(isSuperAdmin, isAdmin, isAuthenticatedAndEmailConfirmed),
    updateQuestion: or(isAdmin, isSuperAdmin, isSelf),
    updateAnswer: or(isAdmin, isSuperAdmin, isSelf),
    updateComment: or(isAdmin, isSuperAdmin, isSelf),
    // uploadFile: not(isAuthenticated),
    updateUser: or(isAdmin, isSuperAdmin, isSelf),
    setReadAllNotifications: isAuthenticated,
    increaseViewCount: isPublic,
  },
  User: isPublic,
  Question: isPublic,
  Answer: isPublic,
  Comment: isPublic,
  Tag: isPublic,
  BlogPost: isPublic,
  Notification: isAuthenticated,
});

export {
  permissions,
  isSelf,
  isSuperAdmin,
  isAdmin,
  isAuthenticated,
  isPublic,
  isAuthenticatedAndEmailConfirmed,
};
