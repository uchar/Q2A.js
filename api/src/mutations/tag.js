import * as yup from 'yup';
import {
  checkInputValidation,
  createAddSuccessResponse,
  findUserByName,
  createSuccessResponse,
  getQuestionsOrderBy,
  createInputErrorResponse,
  findTag,
} from '../utility.js';
import { LANGUAGE, TABLES } from '../constants.js';
import databaseUtils from '../db/database.js';

const tagSchema = yup.object().shape({
  title: yup.string().required().max(48).min(3),
  content: yup.string().required().min(64),
  language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]).required(),
});
const languageSchema = yup.object().shape({
  language: yup.mixed().oneOf([LANGUAGE.PERSIAN, LANGUAGE.ENGLISH]).required(),
});
const createTag = async (inputParams, context) => {
  const user = await findUserByName(context.user.publicName);
  const Tag = databaseUtils().loadModel(TABLES.TAG_TABLE);
  return Tag.create({ userId: user.id, ...inputParams });
};

const addTag = async (_, { language, title, content }, context) => {
  const validationResult = await checkInputValidation(tagSchema, { language, title, content });
  if (validationResult !== true) {
    return validationResult;
  }
  const tag = await findTag(language, title);
  if (tag === null) {
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
  }
  return createInputErrorResponse('Tag already exists.');
};

const updateTag = async (_, { language, id, title, content }) => {
  const validationResult = await checkInputValidation(tagSchema, { language, title, content });
  if (validationResult !== true) {
    return validationResult;
  }
  const Tag = databaseUtils().loadModel(TABLES.TAG_TABLE);
  const tag = await findTag(language, title);
  if (tag === null) {
    await Tag.update(
      {
        title,
        content,
      },
      { where: { id, language } }
    );
    return createSuccessResponse(`/tag/${encodeURIComponent(title)}`);
  }
  return createInputErrorResponse('This tag exists.');
};

const inactiveTag = async (_, { language, id }, context) => {
  const validationResult = await checkInputValidation(languageSchema, { language });
  if (validationResult !== true) {
    return validationResult;
  }
  const Tag = databaseUtils().loadModel(TABLES.TAG_TABLE);
  const tag = await Tag.findOne({
    where: {
      language,
      id,
    },
  });
  const questions = await getQuestionsOrderBy(language, tag.title, [['createdAt', 'DESC']], 1, 0);
  if (questions.length === 0) {
    await Tag.update(
      {
        active: false,
      },
      { where: { id, language } },
      context
    );
    return createSuccessResponse();
  }
  return createInputErrorResponse('There should be no this tag for the question');
};

export { addTag, updateTag, inactiveTag };
