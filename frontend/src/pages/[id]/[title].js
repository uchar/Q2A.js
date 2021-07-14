import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import QuestionItem from '../../common/components/Contents/Post/QuestionItem';
import Layout from '../../common/layouts/Layout';
import CKEditor from '../../common/components/Editor/CKEditor';
import { GET_QUESTION } from '../../API/queries';
import Loading from '../../common/components/Loading';
import AnswerItem from '../../common/components/Contents/Post/AnswerItem';
import { doGraphQLMutation, doGraphQLQuery } from '../../API/utility';
import { getStrings } from '../../common/utlities/languageUtilities';
import { ADD_ANSWER } from '../../API/mutations';
import ErrorMessage from '../../common/components/ErrorMessage';
import {
  addRevalidateAndRedux,
  getFirstItemFromJSON,
  getItemsAndDispatch,
} from '../../common/utlities/generalUtilities';
import { wrapper } from '../../redux/store';
import { SELECTED_QUESTION_ACTION } from '../../redux/constants';
import Q2aButton from '../../common/components/Q2aButton';
import {
  GET_ALL_BLOG_POSTS_DATA,
  GET_ALL_TAGS_DATA,
  SELECTED_QUESTION_QUESTIONS_DATA,
} from '../../common/constants';

const styles = {
  paper: {
    textAlign: 'center',
    color: (theme) => theme.palette.text.secondary,
  },
  button: {
    margin: '0px 52px 30px 20px',
    padding: '10px 60px 10px 60px',
  },
  answerBox: { margin: '25px 25px 0px 25px', paddingTop: '20px' },
  answerBoxTitle: { fontSize: 22, textAlign: 'initial', marginBottom: '20px' },
  submitAnswerButtonParent: { textAlign: 'initial', marginTop: '25px' },
};

const Post = () => {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.selectedQuestion);
  const [answerData, setAnswerData] = useState('');
  const [APIError, setAPIError] = React.useState(null);

  if (!question) return <Loading />;

  const refreshQuestion = async () => {
    const questionData = await doGraphQLQuery(GET_QUESTION, { id: question.id });
    dispatch({ type: SELECTED_QUESTION_ACTION, payload: getFirstItemFromJSON(questionData) });
  };

  const submitAnswer = async () => {
    try {
      if (answerData.length < 15) {
        setAPIError(getStrings().POST_TO_SHORT_ANSWER);
        return;
      }
      setAPIError(null);
      const resultObject = await doGraphQLMutation(ADD_ANSWER, {
        postId: question.id,
        content: answerData,
      });
      const result = resultObject.addAnswer;
      if (result.statusCode !== 'SUCCESS') {
        throw new Error(result.message);
      }
      setAnswerData('');
      await refreshQuestion();
    } catch (error) {
      setAPIError(error.toString());
    }
  };

  return (
    <Box sx={styles.paper}>
      <QuestionItem {...question} />
      {question.answers.map((answer) => {
        return <AnswerItem style={{ width: '80%' }} key={answer.id} rootId={question.id} {...answer} />;
      })}
      <Box sx={styles.answerBox}>
        <Typography sx={styles.answerBoxTitle}>{getStrings().YOUR_ANSWER}</Typography>
        <CKEditor
          data={answerData}
          onChange={(event, editor) => {
            setAnswerData(editor.getData());
          }}
        />
      </Box>
      <Box sx={styles.submitAnswerButtonParent}>
        <Q2aButton
          onSubmit={submitAnswer}
          variant="contained"
          color="primary"
          sx={styles.button}
          loading={false}
          text={getStrings().ASK_BUTTON_SEND_SUBMIT}
        />
      </Box>
      {APIError && <ErrorMessage text={APIError} />}
    </Box>
  );
};
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps((store) => async (ctx) => {
      const { id } = props.params;
      await getItemsAndDispatch(SELECTED_QUESTION_QUESTIONS_DATA, { id }, store);
      await getItemsAndDispatch(GET_ALL_TAGS_DATA, { limit: 50, offset: 0 }, store);
      await getItemsAndDispatch(GET_ALL_BLOG_POSTS_DATA, { limit: 5, offset: 0 }, store);
    })
  );

Post.getLayout = (page) => <Layout>{page}</Layout>;
export default Post;
