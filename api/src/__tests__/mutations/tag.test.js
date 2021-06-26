import { addTag, updateTag, inactiveTag } from '../../mutations/tag.js';
import { makeContext, tagData, updateTagData, clearTable } from '../../testUtility.js';
import { STATUS_CODE, TABLES } from '../../constants.js';

import { findTag } from '../../utility.js';

describe('tag mutations api', () => {
  const addNewTag = async () => {
    return addTag(null, tagData, makeContext());
  };

  // AddTag
  test('if correct input for addTag works', async () => {
    const result = await addNewTag();
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
    expect(result.url).toBe(`/tag/${encodeURIComponent(tagData.title)}`);
  });
  // update Tag
  test('if correct input for updateTag give success', async () => {
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
  // inactive Tag
  test('if correct input for inactive Tag works', async () => {
    await clearTable(TABLES.TAG_TABLE);
    await addNewTag();
    const getNewTag = await findTag(tagData.language, tagData.title);
    console.log('getNewTag:', getNewTag.language);
    const result = await inactiveTag(
      null,
      {
        language: getNewTag.language,
        id: getNewTag.id,
      },
      makeContext()
    );
    console.log('result:', result);
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
});
