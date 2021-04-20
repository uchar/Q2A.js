import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import QuestionItem from '../../common/components/Post/QuestionItem';
import Layout from '../../common/layouts/Layout';
import CKEditor from '../../common/components/Editor/CKEditor';
import { ALL_BLOG_POSTS, ALL_TAGS, GET_QUESTION } from '../../API/queries';
import Loading from '../../common/components/Loading';
import AnswerItem from '../../common/components/Post/AnswerItem';
import { doGraphQLMutation, doGraphQLQuery } from '../../API/utilities';
import { getStrings } from '../../common/utlities/languageUtilities';
import { ADD_ANSWER } from '../../API/mutations';
import ErrorMessage from '../../common/components/ErrorMessage';
import { addRevalidateAndRedux } from '../../common/utlities/generalUtilities';
import { wrapper } from '../../redux/store';
import { ALL_BLOG_POSTS_ACTION, ALL_TAGS_ACTION, SELECTED_QUESTION } from '../../redux/constants';
import Q2aButton from '../../common/components/Q2aButton';

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
    dispatch({ type: SELECTED_QUESTION, payload: questionData.getQuestion });
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
    wrapper.getStaticProps(async ({ store }) => {
      const { id } = props.params;
      const questionData = await doGraphQLQuery(GET_QUESTION, { id });
      const tagsResponse = await doGraphQLQuery(ALL_TAGS, { limit: 50, offset: 0 });
      const blogPostsResponse = await doGraphQLQuery(ALL_BLOG_POSTS, { limit: 5, offset: 0 });
      store.dispatch({ type: ALL_BLOG_POSTS_ACTION, payload: blogPostsResponse.getBlogPosts });
      store.dispatch({ type: ALL_TAGS_ACTION, payload: tagsResponse.getTags });
      store.dispatch({ type: SELECTED_QUESTION, payload: questionData.getQuestion });
    })
  );

Post.getLayout = (page) => <Layout>{page}</Layout>;
export default Post;
