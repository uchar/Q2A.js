import databaseUtils from '../db/database.js';
import { POST_TYPES, TABLES, BLOG_POST_TYPES } from '../constants.js';
import { getAnswers } from './post.js';
import { getUrlFromPost, timeStampToIso, findUserById } from '../utility.js';

const getHomePageTags = async () => {
  return {
    title: 'page.title',
    description: 'SEO made easy for Next.js projects',
    openGraph: {
      type: 'website',
      locale: 'en_IE',
      url: 'http://localhost:3000/',
      title: 'javascript - Next seo test with react testing library - Q2A',
      description: 'Q2A | The World’s Largest Online Community for Developers',
      site_name: 'Q2Ajs.com',
    },
  };
};

const getQuestionPageTags = async (language, metaData) => {
  const { questionId } = JSON.parse(metaData);
  const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const question = await Post.findOne({
    where: {
      language,
      type: POST_TYPES.QUESTION,
      id: questionId,
    },
    include: [User],
  });

  const meta = {
    name: question.title,
    text: question.content,
    answerCount: question.answersCount,
    upvotedCount: question.votesCount,
    dateCreated: timeStampToIso(question.createdAt),
    author: {
      name: question.user.publicName,
    },
  };
  const answers = await getAnswers({ id: question.id });

  if (answers.length > 0) {
    const answer = answers[0];
    meta.acceptedAnswer = {
      text: answer.content,
      dateCreated: timeStampToIso(answer.createdAt),
      upvotedCount: answer.votesCount,
      url: await getUrlFromPost(question),
      author: {
        name: answer.user.publicName,
      },
    };
  }
  return JSON.stringify(meta);
};
const getProfilePageTags = async (language, metaData) => {
  const { id } = JSON.parse(metaData);
  const user = await findUserById(id);
  const meta = {
    type: 'Person',
    name: user.publicName,
    url: user.email,
    sameAs: [user.websiteUrl, user.facebookUrl, user.instagramUrl, user.linkedinUrl],
  };
  return JSON.stringify(meta);
};
const getBlogPostPageTags = async (language, metaData) => {
  const { blogPostId } = JSON.parse(metaData);
  const Post = await databaseUtils().loadModel(TABLES.BLOG_POST_TABLE);
  const User = databaseUtils().loadModel(TABLES.USER_TABLE);
  const blogPost = await Post.findOne({
    where: {
      language,
      type: BLOG_POST_TYPES.POST,
      id: blogPostId,
    },
    include: [User],
  });
  const meta = {
    url: `/blog/${blogPost.id}/${encodeURIComponent(blogPost.title)}`,
    title: blogPost.title,
    // images: [
    //   'https://example.com/photos/1x1/photo.jpg',
    //   'https://example.com/photos/4x3/photo.jpg',
    //   'https://example.com/photos/16x9/photo.jpg',
    // ],
    datePublished: timeStampToIso(blogPost.createdAt),
    dateModified: timeStampToIso(blogPost.updatedAt),
    authorName: blogPost.user.publicName,
    description: blogPost.content,
  };
  return JSON.stringify(meta);
};

const getSeoTag = async (_, { language, seoType, metaData }) => {
  const getSeoFunctions = {};
  getSeoFunctions.HOME_PAGE = getHomePageTags;
  getSeoFunctions.QUESTION_PAGE = getQuestionPageTags;
  getSeoFunctions.SOCIAL_PROFILE_PAGE = getProfilePageTags;
  getSeoFunctions.BLOG_POST_PAGE = getBlogPostPageTags;

  return getSeoFunctions[seoType](language, metaData);
};
export { getSeoTag };
