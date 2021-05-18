import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import BlogItemPreview from './BlogItemPreview';

const styles = {
  root: {
    textAlign: 'center',
  },
};

const LatestBlogPosts = ({ blogPosts }) => {
  return (
    <Box sx={styles.root}>
      {LatestBlogPosts && blogPosts.map((post) => <BlogItemPreview key={post.id} {...post} />)}
    </Box>
  );
};
LatestBlogPosts.propTypes = {
  blogPosts: PropTypes.array.isRequired,
};
export default LatestBlogPosts;
