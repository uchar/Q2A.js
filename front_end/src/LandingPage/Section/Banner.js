import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    // maxWidth: '75%',
    // marginTop: '150px',
    // textAlign: 'center',
    flex: 1,
    alignSelf: 'center',
    textAlign: 'initial',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  title: {
    color: 'textSecondary',
    lineHeight: 1.26,
    textAlign: 'initial',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    // paddingLeft: '150px',
  },
  description: {
    lineHeight: 1.87,
    // marginTop: '30px',
    // paddingLeft: '150px',
  },
  image: {
    maxWidth: '100%',
  },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.root} container>
        <Grid item xs={12} sm={6} className={classes.content}>
          <Typography className={classes.title} variant="h1">
            Build your audience &amp;
            <br /> grow your business online smarter
          </Typography>
          <Typography className={classes.description} variant="h4">
            Get your blood tests delivered at let home collect sample from the victory of the managements that
            supplies best design system guidelines ever. Email
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img className={classes.image} src="/images/banner.png" alt="Picture of the author" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Banner;
