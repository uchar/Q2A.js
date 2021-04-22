import * as yup from 'yup';
import databaseUtils from '../db/database.js';
import { BLOG_POST_TYPES, LANGUAGE, TABLES } from '../constants.js';
import { checkInputValidation } from '../utility.js';

const getBlogPosts = async (_, { language, limit, offset }) => {
  await checkInputValidation(
    yup.object().shape({
      language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]),
      limit: yup.number().required().min(0),
      offset: yup.number().required().min(0),
    }),
    { language, limit, offset }
  );
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

export { getBlogPosts };
