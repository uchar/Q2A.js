import { addQuestion, updateQuestion, addAnswer, updateAnswer, addComment, updateComment } from './post.js';
import { STATUS_CODE } from '../constants.js';
import { makeContext, questionData, questionUpdatedData } from '../testUtility';

describe('post mutations api', () => {
  const testAddQuestionWrongInput = async (language, title, content, tags) => {
    let result;
    try {
      result = await addQuestion(null, { title, content, tags }, makeContext());
    } catch (e) {
      expect(e.name).toBe('ValidationError');
    }
    if (result) expect(`Add Question should give error with:' ${title},${content},${tags}`).toBe(false);
  };

  const addNewQuestion = async (language, title, content, tags) => {
    const result = await addQuestion(null, { language, title, content, tags }, makeContext());
    return result;
  };

  const testUpdateQuestionWrongInput = async (language, questionId, title, content, tags) => {
    let result;
    try {
      result = await updateQuestion(
        null,
        {
          language,
          questionId,
          title,
          content,
          tags,
        },
        makeContext()
      );
    } catch (e) {
      expect(e.name).toBe('ValidationError');
    }
    if (result) expect(`Update Question should give error with:' ${title},${content},${tags}`).toBe(false);
  };

  const testAddAnswerWrongInput = async (language, postId, content, errorMessage, typeErrorFlag) => {
    let result;
    try {
      result = await addAnswer(null, { language, postId, content }, makeContext());
    } catch (e) {
      if (typeErrorFlag) expect(e.name).toBe(errorMessage);
      else expect(e.message).toBe(errorMessage);
    }
    if (result) expect(`add Answer Question should give error with:' ${postId},${content}`).toBe(false);
  };

  const testUpdateAnswerWrongInput = async (language, answerId, content, errorMessage, typeErrorFlag) => {
    console.log('testUpdateAddAnswerWrongInput answerId:', answerId);
    let result;
    try {
      result = await updateAnswer(null, { language, id: answerId, content }, makeContext());
    } catch (e) {
      if (typeErrorFlag) expect(e.name).toBe(errorMessage);
      else expect(e.message).toBe(errorMessage);
    }
    console.log('result:', result);
    if (result) expect(`Update Answer should give error with:' ${answerId},${content}`).toBe(false);
  };

  const testAddCommentWrongInput = async (language, postId, content, errorMessage, typeErrorFlag) => {
    let result;
    try {
      result = await addComment(null, { language, postId, content }, makeContext());
    } catch (e) {
      if (typeErrorFlag) expect(e.name).toBe(errorMessage);
      else expect(e.message).toBe(errorMessage);
    }
    if (result) expect(`add comment Question should give error with:' ${postId},${content}`).toBe(false);
  };
  const testUpdateCommentWrongInput = async (language, commentId, content, errorMessage, typeErrorFlag) => {
    let result;
    try {
      result = await updateComment(null, { language, id: commentId, content }, makeContext());
    } catch (e) {
      if (typeErrorFlag) expect(e.name).toBe(errorMessage);
      else expect(e.message).toBe(errorMessage);
    }
    if (result) expect(`Update Answer should give error with:' ${commentId},${content}`).toBe(false);
  };
  // AddQuestion
  test('if correct input for addQuestion give success', async () => {
    const result = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });

  test("if wrong input for addQuestion doesn't work", async () => {
    await testAddQuestionWrongInput('wrong', questionData.title, questionData.content, questionData.tags);
    await testAddQuestionWrongInput(questionData.language, 'wrong', questionData.content, questionData.tags);
    await testAddQuestionWrongInput(
      questionData.language,
      questionData.title,
      'wrong_content',
      questionData.tags
    );
    await testAddQuestionWrongInput(questionData.language, questionData.title, questionData.content, [
      'wrong',
    ]);
    await testAddQuestionWrongInput(questionData.language, questionData.title, questionData.content, [
      'html',
      'c',
      'c#',
      'c++',
      'python',
      'openCv',
    ]);
    await testAddQuestionWrongInput('wrong', 'wrong_content', ['wrong']);
  });

  // Update Question
  test('if correct input for updateQuestion give success', async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const result = await updateQuestion(
      null,
      {
        language: questionData.language,
        id: question.id,
        title: questionUpdatedData.title,
        content: questionUpdatedData.content,
        tags: questionUpdatedData.tags,
      },
      makeContext()
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
    expect(result.message).toBeTruthy();
  });

  test("if wrong input for updateQuestion shouldn't work", async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const questionId = question.id;
    await testUpdateQuestionWrongInput(
      'wrong',
      questionId,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    await testUpdateQuestionWrongInput(
      questionData.language,
      questionId,
      'wrong',
      questionData.content,
      questionData.tags
    );
    await testUpdateQuestionWrongInput(
      questionData.language,
      questionId,
      questionData.title,
      'wrong_content',
      questionData.tags
    );
    await testUpdateQuestionWrongInput(
      questionData.language,
      questionId,
      questionData.title,
      questionData.content,
      ['c++']
    );
    await testUpdateQuestionWrongInput(questionData.language, questionId, 'wrong', 'wrong_content', ['c++']);
  });

  // addAnswer
  test('if correct input for addAnswer give success', async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const questionId = question.id;
    const result = await addAnswer(
      null,
      { language: questionData.language, postId: questionId, content: questionUpdatedData.content },
      makeContext()
    );

    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
  test("if wrong input for addAnswer shouldn't work", async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const questionId = question.id;
    await testAddAnswerWrongInput(
      questionData.language,
      220,
      questionUpdatedData.content,
      STATUS_CODE.INPUT_ERROR,
      false
    );
    await testAddAnswerWrongInput(
      questionData.language,
      questionId,
      'wrong_content',
      'ValidationError',
      true
    );
  });
  // updateAnswer
  test('if correct input for updateAnswer give success', async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const questionId = question.id;
    const createPostResult = await addAnswer(
      null,
      { language: questionData.language, postId: questionId, content: questionUpdatedData.content },
      makeContext()
    );
    const updateContentAnswer = 'After writing out longhand these combinations I can sense patterns';
    const result = await updateAnswer(
      null,
      { language: questionData.language, id: createPostResult.id, content: updateContentAnswer },
      makeContext()
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
  test("if wrong input for updateAnswer shouldn't work", async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const questionId = question.id;
    const { createPostResult } = await addAnswer(
      null,
      { language: questionData.language, postId: questionId, content: questionUpdatedData.content },
      makeContext()
    );
    await testUpdateAnswerWrongInput(
      questionData.language,
      createPostResult,
      'wrong_updateAnswer',
      'ValidationError',
      true
    );
    await testUpdateAnswerWrongInput(
      questionData.language,
      null,
      questionData.content,
      STATUS_CODE.INPUT_ERROR,
      false
    );
    await testUpdateAnswerWrongInput(
      questionData.language,
      200,
      questionData.content,
      STATUS_CODE.INPUT_ERROR,
      false
    );
  });

  // addComment
  test('if correct input for addComment give success', async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const questionId = question.id;
    const result = await addComment(
      null,
      { language: questionData.language, postId: questionId, content: questionUpdatedData.content },
      makeContext()
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
  test("if wrong input for addComment shouldn't work", async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const questionId = question.id;
    await testAddCommentWrongInput(
      questionData.language,
      220,
      questionUpdatedData.content,
      STATUS_CODE.INPUT_ERROR,
      false
    );
    await testAddCommentWrongInput(questionData.language, questionId, 'wrong', 'ValidationError', true);
    await testAddCommentWrongInput('wrong', questionId, questionData.content, 'ValidationError', true);
  });

  // updateComment
  test('if correct input for updateComment give success', async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const questionId = question.id;
    const createPostResult = await addComment(
      null,
      { language: questionData.language, postId: questionId, content: questionUpdatedData.content },
      makeContext()
    );
    const updateContentComment = 'After writing out longhand these combinations I can sense patterns';
    const result = await updateComment(
      null,
      { language: questionData.language, id: createPostResult.id, content: updateContentComment },
      makeContext()
    );
    expect(result.statusCode).toBe(STATUS_CODE.SUCCESS);
  });
  test("if wrong input for updateComment shouldn't work", async () => {
    const question = await addNewQuestion(
      questionData.language,
      questionData.title,
      questionData.content,
      questionData.tags
    );
    const questionId = question.id;
    const createPostResult = await addComment(
      null,
      { language: questionData.language, postId: questionId, content: questionUpdatedData.content },
      makeContext()
    );
    const { id } = createPostResult;
    await testUpdateCommentWrongInput('wrong', id, questionData.content, 'ValidationError', true);
    await testUpdateCommentWrongInput(questionData.language, id, 'wrong', 'ValidationError', true);
    await testUpdateCommentWrongInput(
      questionData.language,
      null,
      questionData.content,
      STATUS_CODE.INPUT_ERROR,
      false
    );
    await testUpdateCommentWrongInput(
      questionData.language,
      200,
      questionData.content,
      STATUS_CODE.INPUT_ERROR,
      false
    );
  });
});
