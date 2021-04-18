import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '35px',
  },
  title: {
    textAlign: 'center',
    maxWidth: 660,
    marginTop: '10px',
    marginBottom: '20px',
    fontFamily: 'DM Sans',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: 1.28,
    color: '#000000',
  },
  description: {
    textAlign: 'center',
    margin: '0 auto 10px',
    justifyContent: 'center',
    maxWidth: 450,
    fontFamily: 'DM Sans',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: 1.87,
    color: '#000000',
  },
}));

const Feature = ({ data }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Image width={48} height={48} src={data?.icon} alt={data?.title} />
      <Box>
        <Typography variant="h3" className={classes.title}>
          {data?.title}
        </Typography>
        <Typography variant="h4" className={classes.description}>
          {data?.description}
        </Typography>
        {data?.path && (
          <Link href="/">
            <a href={data?.path}>LearnMore</a>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Feature;
