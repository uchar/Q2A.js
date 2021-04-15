import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import CardButton from './CardButton';
import { getStrings } from '../utlities/languageUtilities';
import { DeepMemo } from '../utlities/generalUtilities';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: theme.spacing(6),
    fontSize: '22px',
    fontWeight: '700',
  },
}));

const AskAndTitleSection = DeepMemo(function AskAndTitleSection({ title, className }) {
  const classes = useStyles();
  return (
    <div className={`${classes.root} ${className}`}>
      <Typography className={classes.title} variant="h1">
        {title}
      </Typography>
      <CardButton url={'/ask'} shouldShowLoading={false} text={getStrings().ASK_QUESTION_BUTTON} />
    </div>
  );
});
AskAndTitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default AskAndTitleSection;
