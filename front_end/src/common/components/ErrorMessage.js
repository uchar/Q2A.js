import Typography from '@material-ui/core/Typography';
import React from 'react';

const ErrorMessage = (props) => {
  const { text, ...rest } = props;
  return (
    <div {...rest}>
      <Typography variant="p" style={{ color: 'red' }}>
        {text}
      </Typography>
    </div>
  );
};
export default ErrorMessage;
