import * as yup from 'yup';
import {
  checkInputValidation,
  createAddSuccessResponse,
  findUserByName,
  createSuccessResponse,
} from '../utility.js';
import { BLOG_POST_TYPES, LANGUAGE, TABLES, STATUS_CODE } from '../constants.js';
import databaseUtils from '../db/database.js';

const blogPostSchema = yup.object().shape({
  title: yup.string().required().min(10),
  content: yup.string().required().min(25),
  tags: yup.array().required().min(2).max(5),
  language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]).required(),
});

const commentSchema = yup.object().shape({
  content: yup.string().required().min(10),
  language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]).required(),
});

const updatePost = async (inputParams, postId, language) => {
  const BlogPost = databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
  return BlogPost.update({ ...inputParams }, { where: { id: postId, language } });
};
const getParentPost = async (parentId) => {
  const BlogPost = await databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const blogPost = await BlogPost.findOne({
    where: {
      id: parentId,
    },
    include: [User],
  });
  return blogPost;
};

const createBlogPost = async (inputParams, context) => {
  const user = await findUserByName(context.user.publicName);
  const BlogPost = databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
  return BlogPost.create({ userId: user.id, ...inputParams });
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
// updated BlogPost
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
  return createSuccessResponse(`/blog/${id}/${encodeURIComponent(title)}`);
};
// add Comment to blog
const addBlogComment = async (_, { language, postId, content }, context) => {
  await checkInputValidation(commentSchema, { language, content });
  const parentBlogPost = await getParentPost(postId);
  if (parentBlogPost === null) {
    throw new Error(STATUS_CODE.INPUT_ERROR);
  }
  const createBlogPostResult = await createBlogPost(
    {
      type: BLOG_POST_TYPES.COMMENT,
      content,
      language,
      parentId: postId,
    },
    context
  );
  const createBlogPostId = createBlogPostResult.id;
  return createAddSuccessResponse(createBlogPostId);
};

export { addBlogPost, updateBlogPost, addBlogComment };
