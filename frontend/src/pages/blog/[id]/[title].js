import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import BlogItem from '../../../common/components/Blog/BlogItem';
import Layout from '../../../common/layouts/Layout';
import CKEditor from '../../../common/components/Editor/CKEditor';
import { GET_BLOG_POST } from '../../../API/queries';
import Loading from '../../../common/components/Loading';
import AnswerItem from '../../../common/components/Post/AnswerItem';
import { doGraphQLMutation, doGraphQLQuery, firstItemObject } from '../../../API/utility';
import { getStrings } from '../../../common/utlities/languageUtilities';
import { ADD_BLOG_POST } from '../../../API/mutations';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { addRevalidateAndRedux, getItemsAndDispatch } from '../../../common/utlities/generalUtilities';
import { wrapper } from '../../../redux/store';
import { SELECTED_BLOG_POST_ACTION } from '../../../redux/constants';
import Q2aButton from '../../../common/components/Q2aButton';

import {
  GET_ALL_BLOG_POSTS_DATA,
  GET_ALL_TAGS_DATA,
  SELECTED_BLOG_POST_DATA,
} from '../../../common/constants';

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

const BlogPost = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.selectedBlogPost);
  const [answerData, setAnswerData] = useState('');
  const [APIError, setAPIError] = React.useState(null);

  if (!post) return <Loading />;

  const refreshQuestion = async () => {
    const blogPostData = await doGraphQLQuery(GET_BLOG_POST, { id: post.id });
    console.log('blogPostData:', blogPostData);
    console.log(' firstItemObject:', firstItemObject(blogPostData));
    dispatch({ type: SELECTED_BLOG_POST_ACTION, payload: firstItemObject(blogPostData) });
  };

  const submitAnswer = async () => {
    try {
      if (answerData.length < 15) {
        setAPIError(getStrings().POST_TO_SHORT_ANSWER);
        return;
      }
      setAPIError(null);
      const resultObject = await doGraphQLMutation(ADD_BLOG_POST, {
        postId: post.id,
        content: answerData,
      });
      console.log('resultObject:', resultObject);
      console.log(' firstItemObject:', firstItemObject(resultObject));
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
      <BlogItem {...post} />
      {/* {post.answers.map((answer) => { */}
      {/*  return <AnswerItem style={{ width: '80%' }} key={answer.id} rootId={post.id} {...answer} />; */}
      {/* })} */}
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
      await getItemsAndDispatch(SELECTED_BLOG_POST_DATA, { id }, store);
      await getItemsAndDispatch(GET_ALL_TAGS_DATA, { limit: 50, offset: 0 }, store);
      await getItemsAndDispatch(GET_ALL_BLOG_POSTS_DATA, { limit: 5, offset: 0 }, store);
    })
  );

BlogPost.getLayout = (page) => <Layout>{page}</Layout>;
export default BlogPost;
