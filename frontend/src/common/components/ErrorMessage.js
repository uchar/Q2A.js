import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const styles = {
  text: {
    color: 'red',
  },
};

const ErrorMessage = (props) => {
  const { text, ...rest } = props;
  return (
    <Box type={'error'} {...rest}>
      <Typography variant="body1" sx={styles.text}>
        {text}
      </Typography>
    </Box>
  );
};
ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
export default ErrorMessage;
