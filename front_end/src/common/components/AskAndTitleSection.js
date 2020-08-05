import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CardButton from './CardButton';
import { getStrings } from '../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: '30px',
  },
}));

const AskAndTitleSection = ({ title, className }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.root} ${className}`}>
      <Typography className={classes.title} variant="h2">
        {title}
      </Typography>
      <CardButton url={'/ask'} shouldShowLoading={false} text={getStrings().ASK_QUESTION_BUTTON} />
    </div>
  );
};

export default AskAndTitleSection;
