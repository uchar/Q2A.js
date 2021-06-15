import { addTag, updateTag } from '../../mutations/tag.js';
import { makeContext, tagData, updateTagData } from '../../testUtility.js';
import { STATUS_CODE } from '../../constants.js';

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
    const updateTagResult = await updateTag(
      null,
      {
        language: updateTagData.language,
        id: tag.id,
        title: updateTagData.title,
        content: updateTagData.content,
      },
      makeContext()
    );
    expect(updateTagResult.statusCode).toBe(STATUS_CODE.SUCCESS);
    expect(updateTagResult.message).toBeTruthy();
    const getUpdatedTag = await findTag(tagData.language, updateTagData.title);
    expect(updateTagResult.statusCode).toBe(STATUS_CODE.SUCCESS);
    expect(updateTagResult.message).toBeTruthy();
    expect(updateTagData.title).toBe(getUpdatedTag.title);
    expect(updateTagData.content).toBe(getUpdatedTag.content);
    expect(tag.id).toBe(getUpdatedTag.id);
  });
});
