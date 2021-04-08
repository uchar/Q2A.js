import * as yup from 'yup';
import databaseUtils from '../db/database.js';
import { POST_TYPES, TABLES, STATUS_CODE, LANGUAGE } from '../constants.js';
import {
  createSuccessResponse,
  findUserByName,
  checkInputValidation,
  createAddSuccessResponse,
} from '../utility.js';
import { NOTIFICATION_REASON, saveNotification } from './notifications.js';

const questionSchema = yup.object().shape({
  title: yup.string().required().min(10),
  content: yup.string().required().min(25),
  tags: yup.array().required().min(2).max(5),
  language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]),
});

const answerSchema = yup.object().shape({
  content: yup.string().required().min(20),
  language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]),
});

const commentSchema = yup.object().shape({
  content: yup.string().required().min(10),
  language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]),
});

const createPost = async (inputParams, context) => {
  const user = await findUserByName(context.user.publicName);
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  return Post.create({ userId: user.id, ...inputParams });
};

const updatePost = async (inputParams, postId, language, context) => {
  const user = await findUserByName(context.user.publicName);
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  return Post.update({ ...inputParams }, { where: { userId: user.id, id: postId, language } });
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

const addQuestion = async (_, { language, title, content, tags }, context) => {
  await checkInputValidation(questionSchema, { language, title, content, tags }, context);
  const questionTags = {};
  tags.forEach((tag, index) => {
    questionTags[`tag${index + 1}`] = tag;
  });
  const resultOfPost = await createPost(
    {
      type: POST_TYPES.QUESTION,
      title,
      content,
      language,
      ...questionTags,
    },
    context
  );
  const newPost = resultOfPost.dataValues;
  return createAddSuccessResponse(newPost.id);
};

const addAnswer = async (_, { language, postId, content }, context) => {
  await checkInputValidation(answerSchema, { content }, context);
  const parentPost = await getParentPost(postId);
  if (parentPost === null) {
    throw new Error(STATUS_CODE.INPUT_ERROR);
  }
  const url = await getUrlFromPost(parentPost);
  const createPostResult = await createPost(
    {
      type: POST_TYPES.ANSWER,
      content,
      language,
      parentId: postId,
    },
    context
  );
  const createPostId = createPostResult.id;
  await saveNotification(
    language,
    NOTIFICATION_REASON.ANSWER_RECEIVED,
    context.user.id,
    parentPost.userId,
    parentPost.title,
    content,
    {
      url,
    }
  );
  return createAddSuccessResponse(createPostId);
};

const addComment = async (_, { language, postId, content }, context) => {
  await checkInputValidation(commentSchema, { language, content }, context);
  const parentPost = await getParentPost(postId);
  if (parentPost === null) {
    throw new Error(STATUS_CODE.INPUT_ERROR);
  }
  const url = await getUrlFromPost(parentPost);
  const createPostResult = await createPost(
    {
      type: POST_TYPES.COMMENT,
      content,
      language,
      parentId: postId,
    },
    context
  );
  const createPostId = createPostResult.id;
  await saveNotification(
    language,
    NOTIFICATION_REASON.COMMENT_RECEIVED,
    context.user.id,
    parentPost.userId,
    parentPost.title ? parentPost.title : parentPost.content,
    content,
    {
      url,
    }
  );
  return createAddSuccessResponse(createPostId);
};

const updateAnswer = async (_, { language, id, content }, context) => {
  await checkInputValidation(answerSchema, { language, content }, context);
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  const answer = await Post.findOne({
    where: {
      id,
    },
  });
  if (id === null || answer === null || answer.id === null) {
    throw new Error(STATUS_CODE.INPUT_ERROR);
  }
  await updatePost(
    {
      content,
    },
    id,
    language,
    context
  );
  return createSuccessResponse(``);
};

const updateComment = async (_, { language, id, content }, context) => {
  await checkInputValidation(commentSchema, { language, content }, context);
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  const comment = await Post.findOne({
    where: {
      id,
      language,
    },
  });
  if (id === null || comment === null || comment.id === null) {
    throw new Error(STATUS_CODE.INPUT_ERROR);
  }
  await updatePost(
    {
      content,
    },
    comment,
    language,
    context
  );
  return createSuccessResponse(``);
};

const updateQuestion = async (_, { language, id, title, content, tags }, context) => {
  await checkInputValidation(questionSchema, { language, title, content, tags }, context);
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
    language,
    context
  );
  return createSuccessResponse(`/${id}/${encodeURIComponent(title)}`);
};

export { addComment, addAnswer, updateQuestion, updateComment, updateAnswer, addQuestion };
