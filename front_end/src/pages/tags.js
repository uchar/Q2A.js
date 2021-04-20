import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import Layout from '../common/layouts/Layout';
import { ALL_BLOG_POSTS, ALL_TAGS } from '../API/queries';
import { doGraphQLQuery } from '../API/utilities';
import { ALL_BLOG_POSTS_ACTION, ALL_TAGS_ACTION } from '../redux/constants';
import { wrapper } from '../redux/store';
import { addRevalidateAndRedux } from '../common/utlities/generalUtilities';
import TagDetailsList from '../common/components/Tag/TagDetailsList';

const root = {
  marginTop: (theme) => theme.spacing(5),
};

function TagsPage() {
  const tags = useSelector((state) => state.tags);
  return (
    <Box sx={root}>
      <TagDetailsList tags={tags} />
    </Box>
  );
}

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {
      const tagsResponse = await doGraphQLQuery(ALL_TAGS, { limit: 50, offset: 0 });
      const blogPostsResponse = await doGraphQLQuery(ALL_BLOG_POSTS, { limit: 5, offset: 0 });
      store.dispatch({ type: ALL_TAGS_ACTION, payload: tagsResponse.getTags });
      store.dispatch({ type: ALL_BLOG_POSTS_ACTION, payload: blogPostsResponse.getBlogPosts });
    })
  );

TagsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default TagsPage;
