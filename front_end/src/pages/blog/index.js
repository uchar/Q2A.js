import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ALL_BLOG_POSTS, ALL_TAGS } from '../../API/queries';
import { doGraphQLQuery } from '../../API/utilities';
import { ALL_BLOG_POSTS_ACTION, ALL_QUESTIONS_ACTION, ALL_TAGS_ACTION } from '../../redux/constants';
import { wrapper } from '../../redux/store';
import { addRevalidateAndRedux } from '../../common/utlities/generalUtilities';
import LatestBlogPosts from '../../common/components/Blog/LatestBlogPosts';
import BlogLayout from '../../common/layouts/BlogLayout';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function BlogMainPage() {
  const classes = useStyles();
  const blogPosts = useSelector((state) => state.blogPosts);
  return (
    <Box className={classes.root}>
      <LatestBlogPosts blogPosts={blogPosts} />
    </Box>
  );
}

export const getStaticProps = async (props) =>
  addRevalidateAndRedux(
    props,
    wrapper.getStaticProps(async ({ store }) => {
      const response = await doGraphQLQuery(ALL_BLOG_POSTS, { limit: 30, offset: 0 });
      const tagsResponse = await doGraphQLQuery(ALL_TAGS, { limit: 50, offset: 0 });
      store.dispatch({ type: ALL_BLOG_POSTS_ACTION, payload: response.getBlogPosts });
      store.dispatch({ type: ALL_TAGS_ACTION, payload: tagsResponse.getTags });
    })
  );

BlogMainPage.getLayout = (page) => <BlogLayout>{page}</BlogLayout>;

export default BlogMainPage;
