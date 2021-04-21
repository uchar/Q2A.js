import React from 'react';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ControlledAccordion from '../../common/components/LandingPage/ControlledAccordion';

const styles = {
  root: {
    padding: (theme) => theme.spacing(2),
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    maxWidth: 660,
    margin: '64px auto 10px',
    fontWeight: 600,
    fontSize: '40px',
    lineHeight: 1.33,
    color: '#000000',
  },
  description: {
    textAlign: 'center',
    margin: '0 auto',
    justifyContent: 'center',
    maxWidth: 990,
    fontSize: '20px',
    lineHeight: 1.87,
    color: '#000000',
  },
  accordion: {
    width: '80%',
    marginLeft: '10%',
  },
};

export default function Download(props) {
  return (
    <Box sx={{ ...styles.root, ...props.sx }} id="download">
      <Typography variant="h1" sx={styles.title}>
        How to use Q2A ?
      </Typography>
      <Typography variant="h3" sx={styles.description}>
        You are only 5 mines away from your own question/answer site
      </Typography>
      <ControlledAccordion sx={styles.accordion} />
    </Box>
  );
}
