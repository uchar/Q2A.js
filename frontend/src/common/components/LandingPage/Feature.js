import React from 'react';
import { Box, Button, CardActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  root: {
    display: 'flex',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  cardContent: {
    height: 330,
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
  boxAction: {
    justifyContent: 'center',
  },
  button: {
    color: 'blue',
  },
};

const Feature = ({ data }) => {
  return (
    <Box sx={styles.root} container spacing={2}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <img style={styles.image} src={`/images/landingPage/icons/${data?.icon}`} alt={data?.title} />
          <Typography variant="h3" sx={styles.title}>
            {data?.title}
          </Typography>
          <Typography variant="h4" sx={styles.description}>
            {data?.description}
          </Typography>
        </CardContent>
        <CardActions sx={styles.boxAction}>
          <Button size="small" sx={styles.button}>
            Read More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Feature;
