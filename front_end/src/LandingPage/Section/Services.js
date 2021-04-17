import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Feature from '../../common/components/LandingPage/Feature';

const data = [
  {
    id: 1,
    icon: '/images/icons/1.png',
    path: '#!',
    title: 'ultimate Email  subscription',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 2,
    icon: '/images/icons/2.png',
    path: '#!',
    title: 'Bolt Performance',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 3,
    icon: '/images/icons/3.png',
    path: '#!',
    title: 'Secure Transaction',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 4,
    icon: '/images/icons/4.png',
    path: '#!',
    title: 'Multiple Options',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 5,
    icon: '/images/icons/5.png',
    path: '#!',
    title: '5 Star Rating service',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 6,
    icon: '/images/icons/6.png',
    path: '#!',
    title: 'Integrated with Shopify',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
];
const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2), textAlign: 'center' },
  grid: {
    justifyContent: 'center',
  },
}));
const Services = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.grid} border={1} spacing={2}>
        <Typography variant="h1">Ultimate features you must appreciate</Typography>
        <Typography variant="h3">
          Get your blood tests delivered at let home collect sample from the victory of the managements that
          supplies best design system guidelines ever. Email
        </Typography>
        {data?.map((service) => (
          <Grid item key={service.id}>
            <Feature key={service.id} data={service} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Services;
