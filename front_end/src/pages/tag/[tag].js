import React from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Layout from '../../common/layouts/Layout';
import LatestQuestion from '../../common/components/Post/LatestQuestions';
import { wrapper } from '../../redux/store';
import { CURRENT_TAG_ACTION } from '../../redux/constants';
import { addRevalidateAndRedux, getItemsAndDispatch } from '../../common/utlities/generalUtilities';
import {
  ALL_QUESTIONS_DATA,
  GET_ALL_BLOG_POSTS_DATA,
  GET_ALL_TAGS_DATA,
  GET_STATISTICS_DATA,
} from '../../common/constants';

const styles = {
  paper: {
    textAlign: 'center',
    color: (theme) => theme.palette.text.secondary,
  },
};

const Tag = () => {
  const { questions, statistics, currentTag } = useSelector((state) => state);
  return (
    <Box sx={styles.paper}>
      <LatestQuestion questions={questions} tag={currentTag} statistics={statistics} />
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
      const { tag } = props.params;
      await getItemsAndDispatch(ALL_QUESTIONS_DATA, { tag, limit: 2, offset: 0 }, store);
      await getItemsAndDispatch(GET_ALL_TAGS_DATA, { limit: 50, offset: 0 }, store);
      await getItemsAndDispatch(GET_ALL_BLOG_POSTS_DATA, { limit: 5, offset: 0 }, store);
      await getItemsAndDispatch(GET_STATISTICS_DATA, {}, store);
      store.dispatch({ type: CURRENT_TAG_ACTION, payload: tag });
    })
  );

Tag.getLayout = (page) => <Layout>{page}</Layout>;

export default Tag;
