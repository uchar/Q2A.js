const yup = require('yup');
const database = require('../db/database').getDatabase();
const tables = require('../db/constants').TABLES;
const postTypes = require('../db/constants').POST_TYPES;
const { createSuccessResponse, findUserByName } = require('../utility');

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

const checkInputValidation = async (schema, schemaParams, context) => {
  if (!context.user) {
    throw new Error("You're not authorized");
  }
  await schema.isValid(schemaParams);
};

const createPost = async (inputParams, context) => {
  const user = await findUserByName(context.user.publicName);
  const Post = database.loadModel(tables.POST_TABLE);
  return Post.create({ userId: user.id, ...inputParams });
};

const updatePost = async (inputParams, postId, context) => {
  const user = await findUserByName(context.user.publicName);
  const Post = database.loadModel(tables.POST_TABLE);
  return Post.update({ ...inputParams, isLegacyContent: false }, { where: { userId: user.id, id: postId } });
};

module.exports.addQuestion = async (_, { title, content, tags }, context) => {
  await checkInputValidation(questionSchema, { title, content, tags }, context);
  const questionTags = {};
  tags.forEach((tag, index) => {
    questionTags[`tag${index + 1}`] = tag;
  });
  const resultOfPost = await createPost(
    {
      type: postTypes.QUESTION,
      title,
      content,
      ...questionTags,
    },
    context
  );
  const newPost = resultOfPost.dataValues;
  return createSuccessResponse(`/${newPost.id}/${newPost.title}`);
};

module.exports.updateAnswer = async (_, { id, content }, context) => {
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

module.exports.updateComment = async (_, { id, content }, context) => {
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

module.exports.updateQuestion = async (_, { id, title, content, tags }, context) => {
  await checkInputValidation(questionSchema, { title, content, tags }, context);
  console.log('Context user : ', context.user);
  const questionTags = {};
  tags.forEach((tag, index) => {
    questionTags[`tag${index + 1}`] = tag;
  });
  const resultOfPost = await updatePost(
    {
      title,
      content,
      ...questionTags,
    },
    id,
    context
  );
  const newPost = resultOfPost.dataValues;
  return createSuccessResponse(`/${newPost.id}/${newPost.title}`);
};

module.exports.addAnswer = async (_, { postId, content }, context) => {
  await checkInputValidation(answerSchema, { content }, context);
  await createPost(
    {
      type: postTypes.ANSWER,
      content,
      parentId: postId,
    },
    context
  );
  return createSuccessResponse();
};

module.exports.addComment = async (_, { postId, content }, context) => {
  await checkInputValidation(commentSchema, { content }, context);
  await createPost(
    {
      type: postTypes.COMMENT,
      content,
      parentId: postId,
    },
    context
  );
  return createSuccessResponse();
};
