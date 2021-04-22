import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Feature from '../../common/components/LandingPage/Feature';

const data = [
  {
    id: 0,
    icon: '1.png',
    path: '#!',
    title: 'What is a Question & Answer site?',
    description: `A Q&A site helps your online community to share knowledge. People with questions get the answers they need. 
    The community is enriched by commenting, voting, notifications, points and rankings.`,
  },
  {
    id: 1,
    icon: '2.png',
    path: '#!',
    title: 'Why offer Q&A on my site?',
    description: `Your members will enjoy the interaction that Q&A enables, and will visit your site more regularly. In addition,
     many web searches are questions, so Q&A content will attract search engine traffic.`,
  },
  {
    id: 2,
    icon: '3.png',
    path: '#!',
    title: 'How do I get Q2A?',
    description: `Download Question2Answer, then read how to install. Version 1.8.6 was released on April 20th, 2021. Also on GitHub.`,
  },
  {
    id: 3,
    icon: '4.png',
    path: '#!',
    title: 'What does Q2A need?',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 4,
    icon: '5.png',
    path: '#!',
    title: 'Core Q&A features',
    description: `Fast integrated search engine.
Categories (up to 4 levels deep) and/or tagging.
Voting, comments, follow-on and closed questions.
Points-based reputation management.`,
  },
  {
    id: 5,
    icon: '6.png',
    path: '#!',
    title: 'Fast and secure',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 6,
    icon: '6.png',
    path: '#!',
    title: 'How can I help?',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 7,
    icon: '6.png',
    path: '#!',
    title: 'Integrated with Shopify',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
  {
    id: 8,
    icon: '6.png',
    path: '#!',
    title: 'Integrated with Shopify',
    description: `Get your info tests delivered at home collect a sample from the your task.`,
  },
];
const styles = {
  root: {
    padding: (theme) => theme.spacing(2, 2, 15, 2),
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  grid: {},
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

const Features = (props) => {
  return (
    <Box sx={{ ...styles.root, ...props.sx }} id="features">
      <Typography variant="h1" sx={styles.title}>
        Ultimate features you must appreciate
      </Typography>
      <Typography variant="h3" sx={styles.description}>
        Get your blood tests delivered at let home collect sample from the victory of the managements that
        supplies best design system guidelines ever. Email
      </Typography>
      <Grid sx={styles.grid} spacing={6} container>
        {data?.map((item) => (
          <Grid item key={item.id} md={4} xs={12}>
            <Feature key={item.id} data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
