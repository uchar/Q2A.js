import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ErrorMessage from './ErrorMessage';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    padding: theme.spacing(1, 6, 1, 6),
    marginRight: theme.spacing(3),
  },
  error: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

const SaveCancelButtons = ({ className, onSave, onCancel, error }) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <div className={`${classes.root}`}>
        <Button onClick={onSave} variant="contained" color="primary" className={classes.button}>
          {'ذخیره'}
        </Button>
        <Button onClick={onCancel} variant="contained" color="secondary" className={classes.button}>
          {'لغو'}
        </Button>
      </div>
      {error && <ErrorMessage className={classes.error} text={error} />}
    </div>
  );
};

export default SaveCancelButtons;
