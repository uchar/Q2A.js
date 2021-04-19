import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/ArrowUpward';
import UpVoteIcon from '@material-ui/icons/Visibility';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';
import PropTypes from 'prop-types';
import { DeepMemo } from '../../utlities/generalUtilities';

const styles = {
  root: { display: 'flex', flexDirection: 'row' },
  item: { paddingLeft: (theme) => theme.spacing(1), display: 'flex', flexDirection: 'column' },
  text: {},
};

const getItem = (icon, text, parentStyle, textStyle) => {
  return (
    <Box sx={parentStyle}>
      <IconButton size="small">{icon}</IconButton>
      <Typography variant="button" color="textPrimary" sx={textStyle}>
        {text}
      </Typography>
    </Box>
  );
};

const PostStatistics = DeepMemo(function PostStatistics({ votesCount, viewsCount, answersCount }) {
  return (
    <Box sx={styles.root}>
      {votesCount !== undefined && getItem(<ViewIcon />, votesCount, styles.item, styles.text)}
      {viewsCount !== undefined && getItem(<UpVoteIcon />, viewsCount, styles.item, styles.text)}
      {answersCount !== undefined && getItem(<AnswerIcon />, answersCount, styles.item, styles.text)}
    </Box>
  );
});
PostStatistics.propTypes = {
  votesCount: PropTypes.number,
  viewsCount: PropTypes.number,
  answersCount: PropTypes.number,
};
export default PostStatistics;
