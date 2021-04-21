import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    display: 'flex',
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'initial',
    [(theme) => theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  title: {
    color: 'textSecondary',
    lineHeight: 1.26,
    textAlign: 'initial',
    [(theme) => theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  description: {
    lineHeight: 1.87,
  },
  image: {
    maxWidth: '100%',
  },
};

const UltimateFeatures = (props) => {
  return (
    <Box sx={props.sx} id="features">
      <Grid container sx={styles.root}>
        <Grid item xs={12} sm={6} direction="row" alignItems="center">
          <img style={styles.image} src="/images/banner.png" alt="Picture of the author" />
        </Grid>
          <Grid item xs={12} sm={6} sx={styles.content}>
          <Typography sx={styles.title} variant="h1">
            Build your audience &amp;
            <br /> grow your business online smarter
          </Typography>
          <Typography sx={styles.description} variant="h2">
            Get your blood tests delivered at let home collect sample from the victory of the managements that
            supplies best design system guidelines ever. Email
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UltimateFeatures;
