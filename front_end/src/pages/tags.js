import React from 'react';
import { Box } from '@material-ui/core';
import { useSelector, useStore } from 'react-redux';
import Layout from '../common/layouts/Layout';
import { wrapper } from '../redux/store';
import {
  addRevalidateAndRedux,
  getItemsAndDispatch,
  getItemsWithOffsetAndDispatch,
  getPageCount,
} from '../common/utlities/generalUtilities';
import TagDetailsList from '../common/components/Tag/TagDetailsList';
import Pagination from '../common/components/Pagination';
import { GET_ALL_BLOG_POSTS_DATA, GET_ALL_TAG_DATA, GET_STATISTICS_DATA } from '../common/constants';

const root = {
  marginTop: (theme) => theme.spacing(5),
};

const TagsPage = () => {
  const { tags, statistics } = useSelector((state) => state);
  const store = useStore();
  const handlePageChange = async (page) => {
    return getItemsWithOffsetAndDispatch(page, GET_ALL_TAG_DATA, store);
  };
  return (
    <Box sx={root}>
      <TagDetailsList tags={tags} />
      {statistics && (
        <Pagination pageCount={getPageCount(12, statistics.tagsCount)} onChange={handlePageChange} />
      )}
    </Box>
  );
};

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {
      await getItemsWithOffsetAndDispatch(1, GET_ALL_TAG_DATA, store);
      await getItemsAndDispatch(GET_ALL_BLOG_POSTS_DATA, { limit: 5, offset: 0 }, store);
      await getItemsAndDispatch(GET_STATISTICS_DATA, {}, store);
    })
  );

TagsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default TagsPage;
