import * as yup from 'yup';
import databaseUtils from '../db/database.js';
import { POST_TYPES, TABLES, STATUS_CODE } from '../constants.js';
import { createSuccessResponse, findUserByName, checkInputValidation } from '../utility.js';
import { NOTIFICATION_REASON, saveNotification } from './notifications.js';

const questionSchema = yup.object().shape({
  title: yup.string().required().min(10),
  content: yup.string().required().min(25),
  tags: yup.array().required().min(2).max(5),
});

const answerSchema = yup.object().shape({
  content: yup.string().required().min(20),
});

const commentSchema = yup.object().shape({
  content: yup.string().required().min(10),
});

const createPost = async (inputParams, context) => {
  const user = await findUserByName(context.user.publicName);
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  return Post.create({ userId: user.id, language: user.language, ...inputParams });
};

const updatePost = async (inputParams, postId, context) => {
  const user = await findUserByName(context.user.publicName);
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  return Post.update({ ...inputParams, isLegacyContent: false }, { where: { userId: user.id, id: postId } });
};

const getParentPost = async (parentId) => {
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const post = await Post.findOne({
    where: {
      id: parentId,
    },
    include: [User],
  });
  return post;
};

const getUrlFromPost = async (post) => {
  if (post.type === POST_TYPES.QUESTION) {
    return `/${post.id}/${post.title}`;
  }
  if (post.type === POST_TYPES.ANSWER || post.type === POST_TYPES.COMMENT) {
    const parentQuestion = await getParentPost(post.parentId);
    return getUrlFromPost(parentQuestion);
  }
  console.warn('Type of post not found in getUrlFromPost');
  return '/';
};

const addQuestion = async (_, { title, content, tags }, context) => {
  await checkInputValidation(questionSchema, { title, content, tags }, context);
  const questionTags = {};
  tags.forEach((tag, index) => {
    questionTags[`tag${index + 1}`] = tag;
  });
  const resultOfPost = await createPost(
    {
      type: POST_TYPES.QUESTION,
      title,
      content,
      ...questionTags,
    },
    context
  );
  const newPost = resultOfPost.dataValues;
  return createSuccessResponse(`/${newPost.id}/${encodeURIComponent(newPost.title)}`);
};

const updateAnswer = async (_, { id, content }, context) => {
  await checkInputValidation(answerSchema, { content }, context);
  await updatePost(
    {
      content,
    },
    id,
    context
  );
  return createSuccessResponse(``);
};

const updateComment = async (_, { id, content }, context) => {
  await checkInputValidation(commentSchema, { content }, context);
  await updatePost(
    {
      content,
    },
    id,
    context
  );
  return createSuccessResponse(``);
};

const updateQuestion = async (_, { id, title, content, tags }, context) => {
  await checkInputValidation(questionSchema, { title, content, tags }, context);
  const questionTags = {};
  tags.forEach((tag, index) => {
    questionTags[`tag${index + 1}`] = tag;
  });
  await updatePost(
    {
      title,
      content,
      ...questionTags,
    },
    id,
    context
  );
  return createSuccessResponse(`/${id}/${encodeURIComponent(title)}`);
};

const addAnswer = async (_, { postId, content }, context) => {
  await checkInputValidation(answerSchema, { content }, context);
  console.log('postId:', postId);
  const parentPost = await getParentPost(postId);
  console.log('parentPost:', parentPost);
  if (parentPost === null) {
    throw new Error(STATUS_CODE.INPUT_ERROR);
  }
  const url = await getUrlFromPost(parentPost);

  await createPost(
    {
      type: POST_TYPES.ANSWER,
      content,
      parentId: postId,
    },
    context
  );
  await saveNotification(
    NOTIFICATION_REASON.ANSWER_RECEIVED,
    context.user.id,
    parentPost.userId,
    parentPost.title,
    content,
    {
      url,
    }
  );
  return createSuccessResponse();
};

const addComment = async (_, { postId, content }, context) => {
  await checkInputValidation(commentSchema, { content }, context);
  const parentPost = await getParentPost(postId);
  const url = await getUrlFromPost(parentPost);
  await createPost(
    {
      type: POST_TYPES.COMMENT,
      content,
      parentId: postId,
    },
    context
  );
  await saveNotification(
    NOTIFICATION_REASON.COMMENT_RECEIVED,
    parentPost.userId,
    parentPost.title ? parentPost.title : parentPost.content,
    content,
    {
      url,
    }
  );
  return createSuccessResponse();
};

export { addComment, addAnswer, updateQuestion, updateComment, updateAnswer, addQuestion };
