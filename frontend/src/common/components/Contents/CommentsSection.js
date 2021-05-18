import React from 'react';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CommentItem from './CommentItem';

const styles = {
  item: { marginTop: (theme) => theme.spacing(2) },
};

const CommentsSection = ({ comments, sx }) => {
  return (
    <Box sx={{ ...sx, ...styles.item }}>
      {comments &&
        comments.map((comment) => {
          return (
            <Box sx={styles.item} key={comment.id}>
              <Divider />
              <CommentItem {...comment} />
            </Box>
          );
        })}
    </Box>
  );
};
CommentsSection.propTypes = {
  comments: PropTypes.array.isRequired,
};
export default CommentsSection;
