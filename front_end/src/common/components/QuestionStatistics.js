import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/ArrowUpward';
import UpVoteIcon from '@material-ui/icons/Visibility';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', flexDirection: 'row' },
  item: { marginLeft: theme.spacing(2) },
}));

const QuestionStatistics = ({ votesCount, viewsCount, answersCount }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <IconButton aria-label="add to favorites">
          <ViewIcon />
        </IconButton>
        <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
          {votesCount}
        </Typography>
      </div>
      <div className={classes.item}>
        <IconButton aria-label="add to favorites">
          <UpVoteIcon />
        </IconButton>
        <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
          {viewsCount}
        </Typography>
      </div>
      <div className={classes.item}>
        <IconButton aria-label="add to favorites">
          <AnswerIcon />
        </IconButton>
        <Typography variant="body2" color="textPrimary" style={{ fontSize: 12 }} component="p">
          {answersCount}
        </Typography>
      </div>
    </div>
  );
};

export default QuestionStatistics;
