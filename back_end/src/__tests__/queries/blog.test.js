import { getBlogPosts } from '../../queries/blog.js';
import { TABLES } from '../../constants.js';
import { blogData, clearTable, createDuplicateData } from '../../testUtility';

describe('blog query api', () => {
  test('if getBlogPosts work', async () => {
    await clearTable(TABLES.BLOG_POST_TABLE);
    const testCount = 3;
    await createDuplicateData(testCount, TABLES.BLOG_POST_TABLE, blogData, true);
    const posts = await getBlogPosts(null, { language: blogData.language, limit: 10, offset: 0 });
    expect(posts).toHaveLength(testCount);
  });
});
