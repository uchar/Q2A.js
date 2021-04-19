import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Layout from '../common/layouts/Layout';
import LatestQuestion from '../common/components/Post/LatestQuestions';
import { ALL_BLOG_POSTS, ALL_QUESTIONS, ALL_TAGS } from '../API/queries';
import { doGraphQLQuery } from '../API/utilities';
import { ALL_BLOG_POSTS_ACTION, ALL_QUESTIONS_ACTION, ALL_TAGS_ACTION } from '../redux/constants';
import { wrapper } from '../redux/store';
import { addRevalidateAndRedux } from '../common/utlities/generalUtilities';

const styles = {
  root: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
};

function UsersPage() {
  const questions = useSelector((state) => state.questions);
  return (
    <Box sx={styles.root}>
      <LatestQuestion questions={questions} />
    </Box>
  );
}

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {
      const questionsResponse = await doGraphQLQuery(ALL_QUESTIONS);
      const tagsResponse = await doGraphQLQuery(ALL_TAGS, { limit: 50, offset: 0 });
      const blogPostsResponse = await doGraphQLQuery(ALL_BLOG_POSTS, { limit: 5, offset: 0 });
      store.dispatch({ type: ALL_QUESTIONS_ACTION, payload: questionsResponse });
      store.dispatch({ type: ALL_TAGS_ACTION, payload: tagsResponse.getTags });
      store.dispatch({ type: ALL_BLOG_POSTS_ACTION, payload: blogPostsResponse.getBlogPosts });
    })
  );

UsersPage.getLayout = (page) => <Layout>{page}</Layout>;

export default UsersPage;
