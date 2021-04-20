import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Feature from '../../common/components/LandingPage/Feature';

const data = [
  {
    id: 1,
    icon: '1.png',
    path: '#!',
    title: 'ultimate Email  subscription',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 2,
    icon: '2.png',
    path: '#!',
    title: 'Bolt Performance',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 3,
    icon: '3.png',
    path: '#!',
    title: 'Secure Transaction',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 4,
    icon: '4.png',
    path: '#!',
    title: 'Multiple Options',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 5,
    icon: '5.png',
    path: '#!',
    title: '5 Star Rating service',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 6,
    icon: '6.png',
    path: '#!',
    title: 'Integrated with Shopify',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
];
const styles = {
  root: {
    padding: (theme) => theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#F9FAFC',
    marginTop: '150px',
  },
  grid: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    maxWidth: 660,
    margin: '64px auto 10px',
    fontFamily: 'headingSerif',
    fontWeight: 600,
    fontSize: '40px',
    lineHeight: 1.33,
    color: '#000000',
  },
  description: {
    textAlign: 'center',
    margin: '0 auto 64px',
    justifyContent: 'center',
    maxWidth: 990,
    fontSize: '20px',
    lineHeight: 1.87,
    color: '#000000',
  },
};
const Services = (props) => {
  return (
    <Grid sx={styles.root} id="services">
      <Grid container sx={styles.grid} boxShadow={3} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" sx={styles.title}>
            Ultimate features you must appreciate
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" sx={styles.description}>
            Get your blood tests delivered at let home collect sample from the victory of the managements that
            supplies best design system guidelines ever. Email
          </Typography>
        </Grid>

        {data?.map((service) => (
          <Grid item key={service.id} md={4} xs={12}>
            <Feature key={service.id} data={service} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Services;
