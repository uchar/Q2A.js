import { getSeoTag } from '../../queries/seo';
import { answerData, checkIfHaveEnoughItems, clearTable, makeContext, questionData } from '../../testUtility';
import { addAnswer, addQuestion } from '../../mutations/post';
import { POST_TYPES, TABLES } from '../../constants';
import { getAnswers } from '../../queries/post';

describe('seo mutations api', () => {
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
  test('if correct input for getSeoTag give success', async () => {
    await clearTable(TABLES.POST_TABLE);
    const question = await addNewQuestion();
    const questionId = question.id;
    const getAnswersItem = await getAnswers({ id: questionId });
    expect(getAnswersItem).toHaveLength(0);
    await checkIfHaveEnoughItems(getAnswers, { id: questionId }, 0);
    const addNewAnswer = await createAnswer(answerData, questionId);
    await checkIfHaveEnoughItems(getAnswers, { id: questionId }, 1);
    const result = await getSeoTag(null, {
      language: questionData.language,
      seoType: 'QUESTION_PAGE',
      metaData: {
        questionId,
        table: TABLES.POST_TABLE,
        type: POST_TYPES.QUESTION,
        answerId: addNewAnswer.id,
      },
    });
    expect(result.name).toBe(questionData.title);
    expect(result.text).toBe(questionData.content);
    expect(result.answerCount).toBeGreaterThanOrEqual(0);
    expect(result.upvotedCount).toBeGreaterThanOrEqual(0);
    expect(result.dateCreated).not.toBeNull();
  });
});
