import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = (backgroundColor, color, count) =>
  makeStyles((theme) => ({
    badge: {
      width: '13px',
      height: '13px',
      display: 'flex',
      backgroundColor,
    },
    text: {
      fontSize: '6px',
      textAlign: 'center',
      flex: 1,
      marginTop: '1.5px',
      color,
    },
  }))();

const Medal = ({ className, backgroundColor, color, count }) => {
  const classes = useStyles(backgroundColor, color);

  return (
    <Box border={1} className={`${classes.badge} ${className}`} borderRadius="50%">
      <Typography className={classes.text} variant="button">
        {count}
      </Typography>
    </Box>
  );
};

export default Medal;
