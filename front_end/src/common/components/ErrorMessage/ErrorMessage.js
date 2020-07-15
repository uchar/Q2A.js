import Typography from '@material-ui/core/Typography';
import React from 'react';

const ErrorMessage = (props) => {
  const { text } = props;
  return (
    <Typography variant="p" style={{ color: 'red' }}>
      {text}
    </Typography>
  );
};
export default ErrorMessage;
