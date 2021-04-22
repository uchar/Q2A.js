import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { getStrings } from '../../utlities/languageUtilities';

const styles = {
  root: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    minHeight: '300px',
    marginTop: '25px',
  },
  title: {
    fontSize: '20px',
    paddingTop: '10px',
    paddingBottom: '5px',
    cursor: 'pointer',
    '&:hover': {
      color: '#314285',
      textDecorationLine: 'underline',
    },
  },
  blogPost: {
    textDecorationLine: 'underline',
    fontSize: '12px',
    paddingTop: '12px',
    paddingBottom: '10px',
    cursor: 'pointer',
    '&:hover': {
      color: '#314285',
      textDecorationLine: 'underline',
    },
  },
  divider: {
    padding: '0px 12px 0px 12px',
  },
};

export default function BlogBox({ blogPosts }) {
  return (
    <Box boxShadow={2} sx={styles.root}>
      <Link href={`/blog`}>
        <Typography sx={styles.title}>{getStrings().NEWS_BOX_TITLE}</Typography>
      </Link>
      {blogPosts &&
        blogPosts.map((blogPost) => (
          <Box key={blogPost.id}>
            <Link href={`/blog`}>
              <Typography sx={styles.blogPost}>{blogPost.title}</Typography>
            </Link>
            <Divider sx={styles.divider} />
          </Box>
        ))}
    </Box>
  );
}
BlogBox.propTypes = {
  blogPosts: PropTypes.array.isRequired,
};
