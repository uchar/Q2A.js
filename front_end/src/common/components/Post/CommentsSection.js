import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import CommentItem from './CommentItem';

const useStyles = makeStyles((theme) => ({
  item: { marginTop: theme.spacing(2) },
}));

const CommentsSection = ({ className, comments }) => {
  const classes = useStyles();

  return (
    <div className={className}>
      {comments.map((comment) => {
        return (
          <div className={classes.item} key={comment.id}>
            <Divider />
            <CommentItem {...comment} />
          </div>
        );
      })}
    </div>
  );
};

export default CommentsSection;
