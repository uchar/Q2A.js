import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import BlogItem from '../../../common/components/Blog/BlogItem';
import Layout from '../../../common/layouts/Layout';
import CKEditor from '../../../common/components/Editor/CKEditor';
import { GET_BLOG_POST, GET_QUESTION } from '../../../API/queries';
import Loading from '../../../common/components/Loading';
import { doGraphQLMutation, doGraphQLQuery, firstItemObject } from '../../../API/utility';
import { getStrings } from '../../../common/utlities/languageUtilities';
import { ADD_BLOG_POST } from '../../../API/mutations';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { addRevalidateAndRedux, getItemsAndDispatch } from '../../../common/utlities/generalUtilities';
import { wrapper } from '../../../redux/store';
import { SELECTED_BLOG_POST_ACTION, SELECTED_QUESTION_ACTION } from '../../../redux/constants';
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
  const post = useSelector((state) => state.selectedBlogPost);
  if (!post) return <Loading />;
  return (
    <Box sx={styles.paper}>
      <BlogItem {...post} />
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
