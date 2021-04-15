import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CardContent, Divider, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import Link from 'next/link';
import PropTypes from 'prop-types';
import LatestBlogPosts from '../Blog/LatestBlogPosts';
import {getStrings} from "../../utlities/languageUtilities";

const useStyles = makeStyles((theme) => ({
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
}));

export default function BlogBox({ blogPosts }) {
  const classes = useStyles();

  return (
    <div>
      <Box boxShadow={2} className={classes.root}>
        <Link href={`/blog`}>
          <Typography className={classes.title}>{getStrings().NEWS_BOX_TITLE}</Typography>
        </Link>
        {blogPosts &&
          blogPosts.map((blogPost) => (
            <div key={blogPost.id}>
              <Link href={`/blog`}>
                <Typography className={classes.blogPost}>{blogPost.title}</Typography>
              </Link>
              <Divider className={classes.divider} />
            </div>
          ))}
      </Box>
    </div>
  );
}
BlogBox.propTypes = {
  blogPosts: PropTypes.array.isRequired,
};