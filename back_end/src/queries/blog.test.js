import { getBlogPosts } from './blog.js';
import { BLOG_POST_TYPES, TABLES } from '../constants.js';
import databaseUtils from '../db/database';

describe('blog mutations api', () => {
  const data = {
    title: 'NEXT.js — The Ultimate React Framework\n',
    content: `Next.js provides a solution to all of the commonly faced problems during development with React.js. But more importantly, it puts you and your team in the pit of success when building React applications.
Next.js has the best-in-class “Developer Experience” and many built-in features;
To name a few of them:
An intuitive page-based routing system (with support for dynamic routes)
Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
`,
    tags: ['next.js', 'react'],
    language: 'en',
  };

  const addBlogPost = async (language, title, content, tags) => {
    const user = global.test_user;
    const BlogPost = databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
    const params = { language, title, content, tags, type: BLOG_POST_TYPES.POST };
    const result = await BlogPost.create({ userId: user.id, ...params });
    return result;
  };

  test('if getBlogPosts work', async () => {
    const BlogPost = databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
    const user = global.test_user;

    await BlogPost.destroy({
      where: {},
      truncate: true,
    });
    const postCounts = 3;
    const promisses = [];
    for (let i = 0; i < postCounts; i += 1)
      promisses.push(addBlogPost(data.language, data.title, data.content, data.tags));

    await Promise.all(promisses);
    const posts = await getBlogPosts(
      null,
      { language: data.language, limit: 10, offset: 0 },
      { user: { id: user.id, publicName: user.publicName } }
    );
    expect(posts.length).toBe(3);
    console.log('POSTS ', posts.length);
  });
});
