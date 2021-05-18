import { answerData, clearTable, makeContext, questionData, checkIfHaveEnoughItems } from '../../testUtility';
import { POST_TYPES, TABLES } from '../../constants';
import {
  getAnswers,
  getComments,
  getLatestQuestions,
  getMostViewsQuestions,
  getNoAnswersQuestions,
  getPopularQuestions,
  getQuestion,
  getUserAnswers,
  getUserQuestions,
} from '../../queries/post';
import { addAnswer, addComment, addQuestion } from '../../mutations/post';
import databaseUtils from '../../db/database';

describe('post query api', () => {
  const createQuestion = async (defaultParams, newParams) => {
    const params = { ...defaultParams, ...newParams };
    return addQuestion(
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
  const updateQuestion = async (id, newParams) => {
    const user = global.test_user;
    const Post = await databaseUtils().loadModel(TABLES.POST_TABLE);
    await Post.update(newParams, { where: { userId: user.id, id, language: questionData.language } });
  };

  const testAllQuestionFields = (post, titleToBe) => {
    expect(post.title).toBe(titleToBe);
    expect(post.content).toBe(questionData.content);
    expect(post.type).toBe(POST_TYPES.QUESTION);
    expect(post.tag1).not.toBeNull();
    expect(post.tag2).not.toBeNull();
    expect(post.createdAt).not.toBeNull();
    expect(post.updatedAt).not.toBeNull();
    expect(post.language).toBe(questionData.language);
    expect(post.viewsCount).toBeGreaterThanOrEqual(0);
    expect(post.votesCount).toBeGreaterThanOrEqual(0);
    expect(post.answersCount).toBeGreaterThanOrEqual(0);
    expect(post.user).not.toBeNull();
  };

  const checkIfQuestionsAreInRightOrder = async (functionToCall) => {
    const posts = await functionToCall(null, {
      language: questionData.language,
      tag: questionData.tags[0],
      limit: 10,
      offset: 0,
    });
    testAllQuestionFields(posts[0], 'question_test_3');
    testAllQuestionFields(posts[1], 'question_test_2');
    testAllQuestionFields(posts[2], 'question_test_1');
  };

  const checkIfUserItemsAreInRightOrder = async (functionToCall, id) => {
    const posts = await functionToCall({
      id,
      language: 'en',
    });
    expect(posts[0].title).toBe('question_test_3');
    expect(posts[1].title).toBe('question_test_2');
    expect(posts[2].title).toBe('question_test_1');
  };

  test('if getLatestQuestions return most recent questions', async () => {
    await clearTable(TABLES.POST_TABLE);
    await createQuestion(questionData, { title: 'question_test_1' });
    await createQuestion(questionData, { title: 'question_test_2' });
    await createQuestion(questionData, { title: 'question_test_3' });

    await checkIfQuestionsAreInRightOrder(getLatestQuestions);
  });

  test('if getPopularQuestions return questions with most votes', async () => {
    await clearTable(TABLES.POST_TABLE);
    const q1 = await createQuestion(questionData, { title: 'question_test_1' });
    const q2 = await createQuestion(questionData, { title: 'question_test_2' });
    const q3 = await createQuestion(questionData, { title: 'question_test_3' });
    await updateQuestion(q1.id, { votesCount: 1 });
    await updateQuestion(q2.id, { votesCount: 2 });
    await updateQuestion(q3.id, { votesCount: 3 });
    await checkIfQuestionsAreInRightOrder(getPopularQuestions);
  });
  test('if getMostViewsQuestions return questions with most views', async () => {
    await clearTable(TABLES.POST_TABLE);
    const q1 = await createQuestion(questionData, { title: 'question_test_1' });
    const q2 = await createQuestion(questionData, { title: 'question_test_2' });
    const q3 = await createQuestion(questionData, { title: 'question_test_3' });
    await updateQuestion(q1.id, { viewsCount: 1 });
    await updateQuestion(q2.id, { viewsCount: 2 });
    await updateQuestion(q3.id, { viewsCount: 3 });
    await checkIfQuestionsAreInRightOrder(getMostViewsQuestions);
  });
  test('if getNoAnswers return questions with no answers', async () => {
    await clearTable(TABLES.POST_TABLE);
    await createQuestion(questionData, { title: 'question_test_1' });
    await createQuestion(questionData, { title: 'question_test_2' });
    await createQuestion(questionData, { title: 'question_test_3' });
    await checkIfQuestionsAreInRightOrder(getNoAnswersQuestions);
  });
  test('if getQuestion return item with correct id', async () => {
    await clearTable(TABLES.POST_TABLE);
    const q1 = await createQuestion(questionData, { title: 'question_test_1' });
    const result = await getQuestion(null, { language: questionData.language, id: q1.id });
    expect('question_test_1').toBe(result.title);
  });

  test('if getAnswers return items correctly', async () => {
    await clearTable(TABLES.POST_TABLE);
    const q1 = await createQuestion(questionData, { title: 'question_test_1' });
    const result = await getAnswers({ id: q1.id });
    expect(result).toHaveLength(0);
    await checkIfHaveEnoughItems(getAnswers, { id: q1.id }, 0);
    await createAnswer(answerData, q1.id);
    await checkIfHaveEnoughItems(getAnswers, { id: q1.id }, 1);
  });

  test('if getComments return items correctly', async () => {
    await clearTable(TABLES.POST_TABLE);
    const q1 = await createQuestion(questionData, { title: 'question_test_1' });
    await checkIfHaveEnoughItems(getComments, { id: q1.id }, 0);
    await addComment(
      null,
      { language: answerData.language, postId: q1.id, content: answerData.content },
      makeContext()
    );
    await checkIfHaveEnoughItems(getComments, { id: q1.id }, 1);
    const answer = await createAnswer(answerData, q1.id);
    await addComment(
      null,
      { language: answerData.language, postId: answer.id, content: answerData.content },
      makeContext()
    );
    await checkIfHaveEnoughItems(getComments, { id: answer.id }, 1);
  });
  test('if getUserQuestions return user questions correctly ( sort by createdAt )', async () => {
    await clearTable(TABLES.POST_TABLE);
    const user = global.test_user;
    await createQuestion(questionData, { title: 'question_test_1' });
    await createQuestion(questionData, { title: 'question_test_2' });
    await createQuestion(questionData, { title: 'question_test_3' });
    await checkIfUserItemsAreInRightOrder(getUserQuestions, user.id);
  });
  test('if getUserAnswers return user answers correctly ( sort by createdAt )', async () => {
    await clearTable(TABLES.POST_TABLE);
    const user = global.test_user;
    const q1 = await createQuestion(questionData, {});
    let posts = await getUserAnswers({
      id: user.id,
      language: answerData.language,
    });
    expect(posts).toHaveLength(0);
    await createAnswer(answerData, q1.id);
    await createAnswer(answerData, q1.id);
    posts = await getUserAnswers({
      id: user.id,
      language: answerData.language,
    });
    expect(posts).toHaveLength(2);
    expect(posts[0].content).toBe(answerData.content);
    expect(posts[1].content).toBe(answerData.content);
  });
  // TODO CLAPITEMS TEST
});
