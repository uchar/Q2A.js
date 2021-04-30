import React from 'react';
import { Box } from '@material-ui/core';
import { useSelector, useStore } from 'react-redux';
import { wrapper } from '../../redux/store';
import {
  addRevalidateAndRedux,
  getItemsAndDispatch,
  getItemsWithOffsetAndDispatch,
  getPageCount,
} from '../../common/utlities/generalUtilities';
import LatestBlogPosts from '../../common/components/Blog/LatestBlogPosts';
import BlogLayout from '../../common/layouts/BlogLayout';
import { ALL_BLOG_POSTS_DATA, GET_ALL_TAGS_DATA, GET_STATISTICS_DATA } from '../../common/constants';
import Pagination from '../../common/components/Pagination';

const styles = {
  root: {
    textAlign: 'center',
    color: (theme) => theme.palette.text.secondary,
  },
};

function BlogMainPage() {
  const { blogPosts, statistics } = useSelector((state) => state);
  const store = useStore();
  const handlePageChange = async (page) => {
    return getItemsWithOffsetAndDispatch(page, ALL_BLOG_POSTS_DATA, store);
  };
  return (
    <Box sx={styles.root}>
      <LatestBlogPosts blogPosts={blogPosts} />
      {statistics && (
        <Pagination pageCount={getPageCount( statistics.blogPostsCount)} onChange={handlePageChange} />
      )}
    </Box>
  );
}

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {
      await getItemsWithOffsetAndDispatch(1, ALL_BLOG_POSTS_DATA, store);
      await getItemsAndDispatch(GET_ALL_TAGS_DATA, { limit: 50, offset: 0 }, store);
      await getItemsAndDispatch(GET_STATISTICS_DATA, {}, store);
    })
  );

BlogMainPage.getLayout = (page) => <BlogLayout>{page}</BlogLayout>;

export default BlogMainPage;