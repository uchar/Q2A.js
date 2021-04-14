import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BlogItemPreview from './BlogItemPreview';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  askAndTitleSection: {
    margin: theme.spacing(6),
  },
  appBar: {
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(3, '5%', 1, '5%'),
    width: 'auto',
    textAlign: 'center',
  },
}));

const LatestBlogPosts = ({ blogPosts }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {blogPosts &&
        blogPosts.map((post) => (
          <div key={post.id}>
            <BlogItemPreview {...post} />
          </div>
        ))}
    </div>
  );
};

export default LatestBlogPosts;
