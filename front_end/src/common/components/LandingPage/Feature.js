import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    display: 'flex',
    marginBottom: '20px',
    justifyContent: 'center',
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
    justifySelf: 'center',
  },
  image: {
    maxWidth: '100%',
  },
};
const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5),
  height: 350,
}));
const Feature = ({ data }) => {
  return (
    <Box sx={styles.root} container spacing={2}>
      <Item elevation={1}>
        <img style={styles.image} src={`/images/icons/${data?.icon}`} alt={data?.title} />
        <Typography variant="h3" sx={styles.title}>
          {data?.title}
        </Typography>
        <Typography variant="h4" sx={styles.description}>
          {data?.description}
        </Typography>
        {data?.path && (
          <Link href="/">
            <a href={data?.path}>LearnMore</a>
          </Link>
        )}
      </Item>
    </Box>
  );
};

export default Feature;
