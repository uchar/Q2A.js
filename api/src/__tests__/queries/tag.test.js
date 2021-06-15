import { TABLES } from '../../constants.js';
import {
  clearTable,
  compartDataToBeResult,
  createData,
  createDuplicateData,
  tagData,
} from '../../testUtility';
import { getAllTags, getTagDetail } from '../../queries/tag';

describe('tag queries api', () => {
  test('if getAllTags work', async () => {
    await clearTable(TABLES.TAG_TABLE);
    const testCount = 3;
    await createDuplicateData(testCount, TABLES.TAG_TABLE, tagData, true);
    const result = await getAllTags(null, { language: tagData.language, limit: 10, offset: 0 });
    expect(result).toHaveLength(testCount);
  });
  test('if getTagDetail work', async () => {
    await clearTable(TABLES.TAG_TABLE);
    await createData(TABLES.TAG_TABLE, tagData, true);
    const result = await getTagDetail(null, { language: tagData.language, title: tagData.title });
    compartDataToBeResult(tagData, result);
  });
});
