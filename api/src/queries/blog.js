import * as yup from 'yup';
import databaseUtils from '../db/database.js';
import { BLOG_POST_TYPES, LANGUAGE, TABLES } from '../constants.js';
import { checkInputValidation } from '../utility.js';

const getBlogPosts = async (_, { language, limit, offset }) => {
  const validationResult = await checkInputValidation(
    yup.object().shape({
      language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]),
      limit: yup.number().required().min(0),
      offset: yup.number().required().min(0),
    }),
    { language, limit, offset }
  );
  if (validationResult !== true) {
    console.error(validationResult);
    throw new Error(validationResult.message);
  }
  const BlogPost = await databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  const posts = await BlogPost.findAll({
    where: { type: BLOG_POST_TYPES.POST, language },
    include: [User],
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });
  return posts;
};

const getBlogPost = async (_, { language, id }) => {
  await checkInputValidation(
    yup.object().shape({
      language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]),
    }),
    { language }
  );
  const BlogPost = await databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
  const User = await databaseUtils().loadModel(TABLES.USER_TABLE);
  const post = await BlogPost.findOne({
    where: { language, type: BLOG_POST_TYPES.POST, id },
    include: [User],
  });
  return post;
};
const getBlogPostItemComments = async ({ id }) => {
  const Post = databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const comments = await Post.findAll({
    where: { type: BLOG_POST_TYPES.COMMENT, parentId: id },
    include: [User],
    order: [['createdAt', 'ASC']],
  });
  return comments;
};
export { getBlogPosts, getBlogPost, getBlogPostItemComments };
