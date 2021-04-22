import React from 'react';
import PropTypes from 'prop-types';
import BlogItemPreview from './BlogItemPreview';

const styles = {
  root: {
    textAlign: 'center',
  },
};

const LatestBlogPosts = ({ blogPosts }) => {
  return (
    <div sx={styles.root}>
      {LatestBlogPosts && blogPosts.map((post) => <BlogItemPreview key={post.id} {...post} />)}
    </div>
  );
};
LatestBlogPosts.propTypes = {
  blogPosts: PropTypes.array.isRequired,
};
export default LatestBlogPosts;
