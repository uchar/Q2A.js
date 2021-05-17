import * as yup from 'yup';
import {
  checkInputValidation,
  createAddSuccessResponse,
  findUserByName,
  createSuccessResponse,
} from '../utility.js';
import { BLOG_POST_TYPES, LANGUAGE, TABLES } from '../constants.js';
import databaseUtils from '../db/database.js';

const blogPostSchema = yup.object().shape({
  title: yup.string().required().min(10),
  content: yup.string().required().min(25),
  tags: yup.array().required().min(2).max(5),
  language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]).required(),
});

const updatePost = async (inputParams, postId, language) => {
  const Post = databaseUtils().loadModel(TABLES.POST_TABLE);
  return Post.update({ ...inputParams }, { where: { id: postId, language } });
};
const addBlogPost = async (_, params, context) => {
  const inputParams = { ...params };
  await checkInputValidation(
    yup.object().shape({
      title: yup.string().required().min(10),
      content: yup.string().required().min(100),
      tags: yup.array().required().min(2).max(5),
      language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]).required(),
    }),
    inputParams
  );
  const questionTags = {};
  inputParams.tags.forEach((tag, index) => {
    questionTags[`tag${index + 1}`] = tag;
  });
  inputParams.type = BLOG_POST_TYPES.POST;
  const user = await findUserByName(context.user.publicName);
  const Post = databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
  const result = await Post.create({ userId: user.id, ...inputParams });
  const newPost = result.dataValues;
  return createAddSuccessResponse(newPost.id, `/blog/${newPost.id}/${encodeURIComponent(params.title)}`);
};
const updateBlogPost = async (_, { language, id, title, content, tags }) => {
  await checkInputValidation(blogPostSchema, { language, title, content, tags });
  const blogPostTags = {};
  tags.forEach((tag, index) => {
    blogPostTags[`tag${index + 1}`] = tag;
  });
  await updatePost(
    {
      title,
      content,
      ...blogPostTags,
    },
    id,
    language
  );
  return createSuccessResponse(`/${id}/${encodeURIComponent(title)}`);
};

export { addBlogPost, updateBlogPost };
