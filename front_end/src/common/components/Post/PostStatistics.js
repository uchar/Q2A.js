import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/ArrowUpward';
import UpVoteIcon from '@material-ui/icons/Visibility';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', flexDirection: 'row' },
  item: { marginLeft: theme.spacing(2), display: 'flex', flexDirection: 'column' },
  text: {},
}));

const getItem = (icon, text, rootClassName, textClassName) => {
  return (
    <div className={rootClassName}>
      <IconButton>{icon}</IconButton>
      <Typography variant="button" color="textPrimary" className={textClassName}>
        {text}
      </Typography>
    </div>
  );
};

const PostStatistics = ({ votesCount, viewsCount, answersCount }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {votesCount && getItem(<ViewIcon />, votesCount, classes.item, classes.text)}
      {viewsCount && getItem(<UpVoteIcon />, viewsCount, classes.item, classes.text)}
      {answersCount && getItem(<AnswerIcon />, answersCount, classes.item, classes.text)}
    </div>
  );
};

export default PostStatistics;
