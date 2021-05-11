import React from 'react';
import { Box, Grid } from '@material-ui/core';
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
// TODO create breakpoint

const Home = () => {
  return (
    <Box id="home">
      <Grid sx={styles.root} container>
        <Grid item xs={12} sm={6} sx={styles.content}>
          <Typography sx={styles.title} variant="h1">
            Build your audience &amp;
            <br /> grow your business online smarter
          </Typography>
          <Typography sx={styles.description} variant="h4">
            Get your blood tests delivered at let home collect sample from the victory of the managements that
            supplies best design system guidelines ever. Email
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img style={styles.image} src="/images/landingPage/Header/q2a3.png" alt="Picture of the author" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
