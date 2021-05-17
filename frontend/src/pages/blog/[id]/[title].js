import React from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import BlogItem from '../../../common/components/Blog/BlogItem';
import Layout from '../../../common/layouts/Layout';
import Loading from '../../../common/components/Loading';
import { addRevalidateAndRedux, getItemsAndDispatch } from '../../../common/utlities/generalUtilities';
import { wrapper } from '../../../redux/store';
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
