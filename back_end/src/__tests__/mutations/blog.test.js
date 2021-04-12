import { addBlogPost } from '../../mutations/blog.js';
import { STATUS_CODE } from '../../constants.js';
import { makeContext } from '../../testUtility';

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

  const testAddBlogPostWrongInput = async (language, title, content, tags) => {
    let result;
    try {
      result = await addBlogPost(null, { title, content, tags }, makeContext());
    } catch (e) {
      expect(e.name).toBe('ValidationError');
    }
    if (result) expect(`Add blog post should give error with:' ${title},${content},${tags}`).toBe(false);
  };

  const addNewBlogPost = async (language, title, content, tags) => {
    const result = await addBlogPost(null, { language, title, content, tags }, makeContext());
    return result;
  };

  test('if correct input for add blog post give success', async () => {
    const result = await addNewBlogPost(data.language, data.title, data.content, data.tags);
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });

  test("if wrong input for addBlogPost doesn't work", async () => {
    await testAddBlogPostWrongInput('wrong', data.title, data.content, data.tags);
    await testAddBlogPostWrongInput(data.language, 'wrong', data.content, data.tags);
    await testAddBlogPostWrongInput(data.language, data.title, 'wrong_content', data.tags);
    await testAddBlogPostWrongInput(data.language, data.title, data.content, ['wrong']);
    await testAddBlogPostWrongInput(data.language, data.title, data.content, [
      'html',
      'c',
      'c#',
      'c++',
      'python',
      'openCv',
    ]);
    await testAddBlogPostWrongInput('wrong', 'wrong_content', ['wrong']);
  });
});