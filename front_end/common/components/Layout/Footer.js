import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContet: 'center',
    textAlign: 'cetner',
    alignItems: 'center',
    padding: '20px 0px 20px 0px',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Box  className={classes.root}>
      <Typography style={{ fontSize: 18, textAlign: 'center' }}>7khatcode . copyright2020</Typography>
    </Box>
  );
}
