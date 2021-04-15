import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  text: {
    color: 'red',
  },
}));

const ErrorMessage = (props) => {
  const { text, ...rest } = props;
  const classes = useStyles();
  return (
    <div {...rest}>
      <Typography variant="body1" className={classes.text}>
        {text}
      </Typography>
    </div>
  );
};
ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
export default ErrorMessage;
