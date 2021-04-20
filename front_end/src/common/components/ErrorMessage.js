import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';

const styles ={
  text: {
    color: 'red',
  },
};

const ErrorMessage = (props) => {
  const { text, ...rest } = props;
  return (
    <div {...rest}>
      <Typography variant="body1" sx={styles.text}>
        {text}
      </Typography>
    </div>
  );
};
ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
export default ErrorMessage;
