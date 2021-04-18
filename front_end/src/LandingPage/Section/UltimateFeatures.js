import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';

const useStyles = makeStyles(() => ({
  content: {
    // maxWidth: '80%',
    marginTop: '80px',
    textAlign: 'center',
  },
  title: {
    color: 'textSecondary',
    fontFamily: 'Crimson Text, Serif',
    fontWeight: 600,
    fontSize: '34px',
    lineHeight: 1.26,
  },
  description: {
    maxWidth: '800px',
    fontSize: '20px',
    lineHeight: 1.87,
    marginTop: '30px',
  },
}));

const UltimateFeatures = (props) => {
  const classes = useStyles();
  return (
    <div {...props}>
      <Grid container>
        <Grid item xs={12} sm={6} direction="row" alignItems="center">
          <img src="/images/banner.png" alt="Picture of the author" />
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: '100px' }}>
          <Box className={classes.content}>
            <Typography className={classes.title} variant="h1">
              Build your audience &amp;
              <br /> grow your business online smarter
            </Typography>
            <Typography className={classes.description} variant="h2">
              Get your blood tests delivered at let home collect sample from the victory of the managements
              that supplies best design system guidelines ever. Email
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default UltimateFeatures;
