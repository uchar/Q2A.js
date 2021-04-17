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
  },
}));

const Feature = ({ data }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Image width={48} height={48} src={data?.icon} alt={data?.title} />
      <Box>
        <Typography variant="h4">{data?.title}</Typography>
        <Typography variant="h4">{data?.description}</Typography>
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
