import { addQuestion, updateQuestion, addAnswer, updateAnswer, addComment, updateComment } from './post.js';
import { STATUS_CODE } from '../constants.js';

describe('how post graphql api work', () => {
  const questionData = {
    title: 'How to add a display filter in Alpine.JS like in Vue?',
    content:
      'How can I show date-time in a human-readable format in Alpine.js? I ' +
      'would add a filter in Vuejs to do the same and looking for a similar solution in Alpine.js.',
    tags: ['js', 'vue'],
  };
  const questionUpdatedData = {
    title: 'Generate combinations from 2D array',
    content:
      'After writing out longhand these combinations I can sense patterns, like there are ' +
      'some fixed positions and then index moves from left to right, then left again and everything but cannot wrap my head around the ' +
      'multidimensionallity and how to implement? Loop inside loop inside loop, recursion or what? I am looking for general directions.',
    tags: ['python', 'openCv'],
  };

  const testAddQuestionWrongInput = async (title, content, tags) => {
    const user = global.test_user;
    let result;
    try {
      result = await addQuestion(
        null,
        { title, content, tags },
        { user: { id: user.id, publicName: user.publicName } }
      );
    } catch (e) {
      expect(e.name).toBe('ValidationError');
    }
    if (result) expect(`Add Question should give error with:' ${title},${content},${tags}`).toBe(false);
  };

  const newAddQuestion = async (title, content, tags) => {
    const user = global.test_user;
    const result = await addQuestion(
      null,
      { title, content, tags },
      { user: { id: user.id, publicName: user.publicName } }
    );
    return result;
  };
  const testUpdateQuestionWrongInput = async (questionId, title, content, tags) => {
    const user = global.test_user;
    let result;
    try {
      result = await updateQuestion(
        null,
        {
          questionId,
          title,
          content,
          tags,
        },
        { user: { id: user.id, publicName: user.publicName } }
      );
    } catch (e) {
      expect(e.name).toBe('ValidationError');
    }
    if (result) expect(`Update Question should give error with:' ${title},${content},${tags}`).toBe(false);
  };

  const testAddAnswerWrongInput = async (postId, content, errorMessage, typeErrorFlag) => {
    const user = global.test_user;
    let result;
    try {
      result = await addAnswer(
        null,
        { postId, content },
        { user: { id: user.id, publicName: user.publicName } }
      );
    } catch (e) {
      if (typeErrorFlag) expect(e.name).toBe(errorMessage);
      else expect(e.message).toBe(errorMessage);
    }
    if (result) expect(`add Answer Question should give error with:' ${postId},${content}`).toBe(false);
  };

  const testUpdateAddAnswerWrongInput = async (answerId, content, errorMessage, typeErrorFlag) => {
    const user = global.test_user;
    console.log('testUpdateAddAnswerWrongInput answerId:', answerId);
    let result;
    try {
      result = await updateAnswer(
        null,
        { id: answerId, content },
        { user: { id: user.id, publicName: user.publicName } }
      );
    } catch (e) {
      if (typeErrorFlag) expect(e.name).toBe(errorMessage);
      else expect(e.message).toBe(errorMessage);
    }
    console.log('result:', result);
    if (result) expect(`Update Answer should give error with:' ${answerId},${content}`).toBe(false);
  };

  const testAddCommentWrongInput = async (postId, content, errorMessage, typeErrorFlag) => {
    const user = global.test_user;
    let result;
    try {
      result = await addComment(
        null,
        { postId, content },
        { user: { id: user.id, publicName: user.publicName } }
      );
    } catch (e) {
      if (typeErrorFlag) expect(e.name).toBe(errorMessage);
      else expect(e.message).toBe(errorMessage);
    }
    if (result) expect(`add comment Question should give error with:' ${postId},${content}`).toBe(false);
  };
  const testUpdateAddCommentWrongInput = async (commentId, content, errorMessage, typeErrorFlag) => {
    const user = global.test_user;
    let result;
    try {
      result = await updateComment(
        null,
        { id: commentId, content },
        { user: { id: user.id, publicName: user.publicName } }
      );
    } catch (e) {
      if (typeErrorFlag) expect(e.name).toBe(errorMessage);
      else expect(e.message).toBe(errorMessage);
    }
    if (result) expect(`Update Answer should give error with:' ${commentId},${content}`).toBe(false);
  };
  // AddQuestion
  test('if correct input for addQuestion give success', async () => {
    const result = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });

  test("if wrong input for addQuestion shouldn't work", async () => {
    await testAddQuestionWrongInput('wrong', questionData.content, questionData.tags);
    await testAddQuestionWrongInput(questionData.title, 'wrong_content', questionData.tags);
    await testAddQuestionWrongInput(questionData.title, questionData.content, ['wrong']);
    await testAddQuestionWrongInput(questionData.title, questionData.content, [
      'html',
      'c',
      'c#',
      'c++',
      'python',
      'openCv',
    ]);
    await testAddQuestionWrongInput('wrong', 'wrong_content', ['wrong']);
  });

  // Update AddQuestion
  test('if correct input for updateQuestion give success', async () => {
    const user = global.test_user;
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const result = await updateQuestion(
      null,
      {
        id: question.id,
        title: questionUpdatedData.title,
        content: questionUpdatedData.content,
        tags: questionUpdatedData.tags,
      },
      { user: { id: user.id, publicName: user.publicName } }
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
    expect(result.message).toBeTruthy();
  });

  test("if wrong input for updateQuestion shouldn't work", async () => {
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const questionId = question.id;
    await testUpdateQuestionWrongInput(questionId, 'wrong', questionData.content, questionData.tags);
    await testUpdateQuestionWrongInput(questionId, questionData.title, 'wrong_content', questionData.tags);
    await testUpdateQuestionWrongInput(questionId, questionData.title, questionData.content, ['c++']);
    await testUpdateQuestionWrongInput(questionId, 'wrong', 'wrong_content', ['c++']);
  });

  // addAnswer
  test('if correct input for addAnswer give success', async () => {
    const user = global.test_user;
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const questionId = question.id;
    const result = await addAnswer(
      null,
      { postId: questionId, content: questionUpdatedData.content },
      { user: { id: user.id, publicName: user.publicName } }
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
  test("if wrong input for addAnswer shouldn't work", async () => {
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const questionId = question.id;
    await testAddAnswerWrongInput(220, questionUpdatedData.content, STATUS_CODE.INPUT_ERROR, false);
    await testAddAnswerWrongInput(questionId, 'wrong_content', 'ValidationError', true);
  });
  // updateAnswer
  test('if correct input for updateAnswer give success', async () => {
    const user = global.test_user;
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const questionId = question.id;
    const createPostResult = await addAnswer(
      null,
      { postId: questionId, content: questionUpdatedData.content },
      { user: { id: user.id, publicName: user.publicName } }
    );
    const updateContentAnswer = 'After writing out longhand these combinations I can sense patterns';
    const result = await updateAnswer(
      null,
      { id: createPostResult.id, content: updateContentAnswer },
      { user: { id: user.id, publicName: user.publicName } }
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
  test("if wrong input for updateAnswer shouldn't work", async () => {
    const user = global.test_user;
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const questionId = question.id;
    const { createPostResult } = await addAnswer(
      null,
      { postId: questionId, content: questionUpdatedData.content },
      { user: { id: user.id, publicName: user.publicName } }
    );
    await testUpdateAddAnswerWrongInput(createPostResult, 'wrong_updateAnswer', 'ValidationError', true);
    await testUpdateAddAnswerWrongInput(null, questionData.content, STATUS_CODE.INPUT_ERROR, false);
    await testUpdateAddAnswerWrongInput(200, questionData.content, STATUS_CODE.INPUT_ERROR, false);
  });

  // addComment
  test('if correct input for addComment give success', async () => {
    const user = global.test_user;
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const questionId = question.id;
    const result = await addComment(
      null,
      { postId: questionId, content: questionUpdatedData.content },
      { user: { id: user.id, publicName: user.publicName } }
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
  test("if wrong input for addComment shouldn't work", async () => {
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const questionId = question.id;
    await testAddCommentWrongInput(220, questionUpdatedData.content, STATUS_CODE.INPUT_ERROR, false);
    await testAddCommentWrongInput(questionId, 'wrong', 'ValidationError', true);
  });

  // updateComment
  test('if correct input for updateComment give success', async () => {
    const user = global.test_user;
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const questionId = question.id;
    const createPostResult = await addComment(
      null,
      { postId: questionId, content: questionUpdatedData.content },
      { user: { id: user.id, publicName: user.publicName } }
    );
    const updateContentComment = 'After writing out longhand these combinations I can sense patterns';
    const result = await updateComment(
      null,
      { id: createPostResult.id, content: updateContentComment },
      { user: { id: user.id, publicName: user.publicName } }
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
  test("if wrong input for updateComment shouldn't work", async () => {
    const user = global.test_user;
    const question = await newAddQuestion(questionData.title, questionData.content, questionData.tags);
    const questionId = question.id;
    const createPostResult = await addComment(
      null,
      { postId: questionId, content: questionUpdatedData.content },
      { user: { id: user.id, publicName: user.publicName } }
    );
    const { id } = createPostResult;
    await testUpdateAddCommentWrongInput(id, 'wrong', 'ValidationError', true);
    await testUpdateAddCommentWrongInput(null, questionData.content, STATUS_CODE.INPUT_ERROR, false);
    await testUpdateAddCommentWrongInput(200, questionData.content, STATUS_CODE.INPUT_ERROR, false);
  });
});
