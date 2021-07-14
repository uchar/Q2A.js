import { addTag, updateTag, inactiveTag } from '../../mutations/tag.js';
import { makeContext, tagData, updateTagData, clearTable, questionData } from '../../testUtility.js';
import { STATUS_CODE, TABLES } from '../../constants.js';

import { findTag } from '../../utility.js';

import { addQuestion } from '../../mutations/post';

describe('tag mutations api', () => {
  const addNewTag = async () => {
    return addTag(null, tagData, makeContext());
  };
  const createQuestion = async (defaultParams, newParams) => {
    const params = { ...defaultParams, ...newParams };
    return addQuestion(
      null,
      {
        language: params.language,
        title: params.title,
        content: params.content,
        tags: params.tags,
      },
      makeContext()
    );
  };
  // AddTag
  test('if correct input for addTag works', async () => {
    await clearTable(TABLES.TAG_TABLE);
    const result = await addNewTag();
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
    expect(result.url).toBe(`/tag/${encodeURIComponent(tagData.title)}`);
  });
  test('if repeat input for addTag works', async () => {
    await clearTable(TABLES.TAG_TABLE);
    await addNewTag();
    const result = await addNewTag();
    expect(result.statusCode).toBe(STATUS_CODE.INPUT_ERROR);
  });
  // update Tag
  test('if correct input for updateTag give success', async () => {
    await clearTable(TABLES.TAG_TABLE);
    const tag = await addNewTag();
    const result = await updateTag(
      null,
      {
        language: updateTagData.language,
        id: tag.id,
        title: updateTagData.title,
        content: updateTagData.content,
      },
      makeContext()
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
    expect(result.message).toBeTruthy();
    const getUpdatedTag = await findTag(tagData.language, updateTagData.title);
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
    expect(result.message).toBeTruthy();
    expect(updateTagData.title).toBe(getUpdatedTag.title);
    expect(updateTagData.content).toBe(getUpdatedTag.content);
    expect(tag.id).toBe(getUpdatedTag.id);
  });
  test('if repeat input for updateTag give success', async () => {
    await clearTable(TABLES.TAG_TABLE);
    const tag = await addNewTag();
    const result = await updateTag(
      null,
      {
        language: updateTagData.language,
        id: tag.id,
        title: tagData.title,
        content: updateTagData.content,
      },
      makeContext()
    );
    expect(result.statusCode).toBe(STATUS_CODE.INPUT_ERROR);
  });
  // inactive Tag
  test('if correct input for inactive Tag works', async () => {
    await clearTable(TABLES.TAG_TABLE);
    await addNewTag();
    const getNewTag = await findTag(tagData.language, tagData.title);
    expect(getNewTag.active).toBe(true);
    const result = await inactiveTag(
      null,
      {
        language: getNewTag.language,
        id: getNewTag.id,
      },
      makeContext()
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
  test('if enter repeat tag input for inactive Tag works', async () => {
    await clearTable(TABLES.TAG_TABLE);
    await addNewTag();
    const getNewTag = await findTag(tagData.language, tagData.title);
    expect(getNewTag.active).toBe(true);
    await createQuestion(questionData, { title: 'question_test_1' });
    const result = await inactiveTag(
      null,
      {
        language: getNewTag.language,
        id: getNewTag.id,
      },
      makeContext()
    );
    expect(result.statusCode).toBe(STATUS_CODE.INPUT_ERROR);
  });
});
