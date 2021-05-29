import databaseUtils from '../db/database.js';
import { POST_TYPES, TABLES } from '../constants.js';
import { getAnswers } from './post.js';
import { getUrlFromPost, timeStampToIso } from '../utility.js';

const getSeoTag = async (_, { language, seoType, metaData }) => {
  console.log('In getSeoTag', language, seoType, metaData);

  if (seoType === 'HOME_PAGE') {
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
  }
  if (seoType === 'QUESTION_PAGE') {
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
  }
  return true;
};
export { getSeoTag };
