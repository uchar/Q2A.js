import * as yup from 'yup';
import {
  checkInputValidation,
  createAddSuccessResponse,
  findUserByName,
  createSuccessResponse,
} from '../utility.js';
import { LANGUAGE, TABLES } from '../constants.js';
import databaseUtils from '../db/database.js';

const tagSchema = yup.object().shape({
  title: yup.string().required().max(48).min(3),
  content: yup.string().required().min(64),
  language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]).required(),
});

const createTag = async (inputParams, context) => {
  const user = await findUserByName(context.user.publicName);
  const Tag = databaseUtils().loadModel(TABLES.TAG_TABLE);
  return Tag.create({ userId: user.id, ...inputParams });
};

const addTag = async (_, { language, title, content }, context) => {
  await checkInputValidation(tagSchema, { language, title, content });
  const resultOfPost = await createTag(
    {
      title,
      content,
      language,
    },
    context
  );
  const newTag = resultOfPost.dataValues;
  return createAddSuccessResponse(newTag.id, `/tag/${encodeURIComponent(title)}`);
};

const updateTag = async (_, { language, id, title, content }) => {
  await checkInputValidation(tagSchema, { language, title, content });
  const Post = databaseUtils().loadModel(TABLES.TAG_TABLE);
  await Post.update(
    {
      title,
      content,
    },
    { where: { id, language } }
  );
  return createSuccessResponse(`/tag/${encodeURIComponent(title)}`);
};

export { addTag, updateTag };
