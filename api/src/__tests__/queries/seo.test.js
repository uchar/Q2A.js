import { getSeoTag } from '../../queries/seo';
import {
  answerData,
  blogData,
  checkIfHaveEnoughItems,
  clearTable,
  makeContext,
  questionData,
} from '../../testUtility';
import { addAnswer, addQuestion } from '../../mutations/post';
import { TABLES } from '../../constants';
import { getAnswers } from '../../queries/post';
import { addBlogPost } from '../../mutations/blog';
import { findUserById } from '../../utility.js';

describe('Getting seo tags', () => {
  const addNewQuestion = async () => {
    const { language } = questionData;
    const { title } = questionData;
    const { content } = questionData;
    const { tags } = questionData;
    return addQuestion(null, { language, title, content, tags }, makeContext());
  };
  const createAnswer = async (defaultParams, postId) => {
    return addAnswer(
      null,
      {
        language: defaultParams.language,
        content: defaultParams.content,
        postId,
      },
      makeContext()
    );
  };
  const addNewBlogPost = async () => {
    const { language } = blogData;
    const { title } = blogData;
    const { content } = blogData;
    const { tags } = blogData;
    return addBlogPost(null, { language, title, content, tags }, makeContext());
  };
  // Question And Answer Seo
  test('if correct input for QUESTION_PAGE in getSeoTag give success', async () => {
    await clearTable(TABLES.POST_TABLE);
    const question = await addNewQuestion();
    const questionId = question.id;
    const getAnswersItem = await getAnswers({ id: questionId });
    expect(getAnswersItem).toHaveLength(0);
    await checkIfHaveEnoughItems(getAnswers, { id: questionId }, 0);
    await createAnswer(answerData, questionId);
    await checkIfHaveEnoughItems(getAnswers, { id: questionId }, 1);
    const getDataSeo = await getSeoTag(null, {
      language: questionData.language,
      seoType: 'QUESTION_PAGE',
      metaData: JSON.stringify({
        questionId,
      }),
    });
    const result = JSON.parse(getDataSeo);
    expect(result.name).toBe(questionData.title);
    expect(result.text).toBe(questionData.content);
    expect(result.answerCount).toBeGreaterThanOrEqual(0);
    expect(result.upvotedCount).toBeGreaterThanOrEqual(0);
    expect(result.dateCreated).not.toBeNull();
  });
  // User Social Profile Seo
  test('if correct input for PROFILE_PAGE in getSeoTag give success', async () => {
    await clearTable(TABLES.POST_TABLE);
    const user = global.test_user;
    let result = await getSeoTag(null, {
      language: questionData.language,
      seoType: 'PROFILE_PAGE',
      metaData: JSON.stringify({
        id: user.id,
      }),
    });
    result = JSON.parse(result);
    expect(user.publicName).toBe(result.name);
    expect(user.email).toBe(result.url);
    expect(user.websiteUrl).toBe(result.sameAs[0]);
    expect(user.facebookUrl).toBe(result.sameAs[1]);
    expect(user.instagramUrl).toBe(result.sameAs[2]);
    expect(user.linkedinUrl).toBe(result.sameAs[3]);
  });
  // Blog Post Seo
  test('if correct input for BLOG_POST_PAGE in getSeoTag give success', async () => {
    await clearTable(TABLES.BLOG_POST_TABLE);
    const blogPost = await addNewBlogPost(blogData.language, blogData.title, blogData.content, blogData.tags);
    const getDataSeo = await getSeoTag(null, {
      language: blogData.language,
      seoType: 'BLOG_POST_PAGE',
      metaData: JSON.stringify({
        blogPostId: blogPost.id,
      }),
    });
    const user = await findUserById(blogPost.id);
    const result = JSON.parse(getDataSeo);
    expect(result.url).toBe(blogPost.url);
    expect(result.title).toBe(blogData.title);
    expect(result.description).toBe(blogData.content);
    expect(result.authorName).toBe(user.publicName);
    expect(result.datePublished).not.toBeNull();
    expect(result.dateModified).not.toBeNull();
  });
});
