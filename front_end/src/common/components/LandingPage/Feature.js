import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const styles = {
  root: {
    display: 'flex',
    marginBottom: '80px',
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    [(theme) => theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  title: {
    color: 'textSecondary',
    lineHeight: 1.26,
    textAlign: 'center',
    marginBottom: '20px',
    [(theme) => theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginBottom: '30px',
    },
  },
  description: {
    lineHeight: 1.87,
    textAlign: 'center',
    maxWidth: '295px',
    [(theme) => theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      maxWidth: '280px',
    },
  },
  image: {
    maxWidth: '100%',
  },
};

const Feature = ({ data }) => {
  return (
    <Box sx={styles.root}>
      <Grid container spacing={2} direction="column">
        <Grid item xs>
          <img style={styles.image} src={`/images/icons/${data?.icon}`} alt={data?.title} />
        </Grid>
        <Grid item xs sx={styles.content}>
          <Typography variant="h3" sx={styles.title}>
            {data?.title}
          </Typography>
          <Typography variant="h4" sx={styles.description}>
            {data?.description}
          </Typography>
        </Grid>
        <Grid item xs>
          {data?.path && (
            <Link href="/">
              <a href={data?.path}>LearnMore</a>
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Feature;
