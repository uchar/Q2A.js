import { getBlogPosts, getBlogPost, getBlogPostItemComments } from '../../queries/blog.js';
import { TABLES } from '../../constants.js';
import {
  blogData,
  clearTable,
  createData,
  createDuplicateData,
  makeContext,
  checkIfHaveEnoughItems,
  blogCommentData,
} from '../../testUtility';
import { addBlogComment } from '../../mutations/blog';

describe('blog query api', () => {
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
    const blogPost = await createData(TABLES.BLOG_POST_TABLE, blogData, true);
    const result = await getBlogPost(null, { language: blogData.language, id: blogPost.id });
    expect(blogPost.title).toBe(result.title);
    expect(blogPost.content).toBe(result.content);
    expect(blogPost.tags).toBe(result.tags);
    expect(blogPost.id).toBe(result.id);
  });

  test('if getComments return items correctly', async () => {
    await clearTable(TABLES.BLOG_POST_TABLE);
    const blogPost = await createData(TABLES.BLOG_POST_TABLE, blogData, true);
    await checkIfHaveEnoughItems(getBlogPostItemComments, { id: blogPost.id }, 0);

    await addBlogComment(
      null,
      { language: blogCommentData.language, postId: blogPost.id, content: blogCommentData.content },
      makeContext()
    );
    await checkIfHaveEnoughItems(getBlogPostItemComments, { id: blogPost.id }, 1);
    await addBlogComment(
      null,
      { language: blogCommentData.language, postId: blogPost.id, content: blogCommentData.content },
      makeContext()
    );
    await checkIfHaveEnoughItems(getBlogPostItemComments, { id: blogPost.id }, 2);
  });
});
