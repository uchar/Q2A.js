import * as yup from 'yup';
import databaseUtils from '../db/database';
import { BLOG_POST_TYPES, LANGUAGE, TABLES } from '../constants';
import { checkInputValidation, findUserByName } from '../utility';

const getBlogPosts = async (_, { language, limit, offset }, context) => {
  await checkInputValidation(
    yup.object().shape({
      language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]),
      limit: yup.number().required().min(0),
      offset: yup.number().required().min(0),
    }),
    { language, limit, offset },
    context
  );
  const BlogPost = await databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
  const user = await findUserByName(context.user.publicName);
  const posts = await BlogPost.findAll({
    where: { type: BLOG_POST_TYPES.POST, userId: user.id, language },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });
  return posts;
};

export { getBlogPosts };
