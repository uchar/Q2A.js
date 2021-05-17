import { getBlogPosts, getBlogPost } from '../../queries/blog.js';
import { TABLES } from '../../constants.js';
import { blogData, clearTable, createDuplicateData, makeContext } from '../../testUtility';
import { addBlogPost } from '../../mutations/blog';

describe('blog query api', () => {
  const createBlogPost = async (defaultParams, newParams) => {
    const params = { ...defaultParams, ...newParams };
    return addBlogPost(
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

  // getBlogPosts
  test('if getBlogPosts work', async () => {
    await clearTable(TABLES.BLOG_POST_TABLE);
    const testCount = 3;
    await createDuplicateData(testCount, TABLES.BLOG_POST_TABLE, blogData, true);
    const posts = await getBlogPosts(null, { language: blogData.language, limit: 10, offset: 0 });
    expect(posts).toHaveLength(testCount);
  });
  // getBlogPost
  test('if getBlogPost return item with correct id', async () => {
    await clearTable(TABLES.BLOG_POST_TABLE);
    const blogPost = await createBlogPost(blogData, { title: 'blogPost_test_1' });
    const result = await getBlogPost(null, { language: blogData.language, id: blogPost.id });
    expect('blogPost_test_1').toBe(result.title);
    expect(blogPost.id).toBe(result.id);
  });
});
