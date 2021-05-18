import React from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Layout from '../common/layouts/Layout';
import LatestQuestion from '../common/components/Contents/Post/LatestQuestions';
import { wrapper } from '../redux/store';
import { addRevalidateAndRedux, getItemsAndDispatch } from '../common/utlities/generalUtilities';
import {
  ALL_QUESTIONS_DATA,
  GET_ALL_BLOG_POSTS_DATA,
  GET_ALL_TAGS_DATA,
  GET_STATISTICS_DATA,
} from '../common/constants';

const styles = {
  root: {
    textAlign: 'center',
  },
};

function MainPage() {
  const { questions, statistics } = useSelector((state) => state);
  return (
    <Box sx={styles.root}>
      <LatestQuestion questions={questions} statistics={statistics} />
    </Box>
  );
}

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {
      await getItemsAndDispatch(ALL_QUESTIONS_DATA, { limit: 12, offset: 0 }, store);
      await getItemsAndDispatch(GET_ALL_TAGS_DATA, { limit: 50, offset: 0 }, store);
      await getItemsAndDispatch(GET_ALL_BLOG_POSTS_DATA, { limit: 5, offset: 0 }, store);
      await getItemsAndDispatch(GET_STATISTICS_DATA, {}, store);
    })
  );

MainPage.getLayout = (page) => <Layout>{page}</Layout>;

export default MainPage;
