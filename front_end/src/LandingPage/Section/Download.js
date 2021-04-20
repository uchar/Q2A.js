import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ControlledAccordion from '../../common/components/LandingPage/ControlledAccordion';

const styles = {
  root: {
    padding: (theme) => theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#F9FAFC',
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
};

export default function Download(props) {
  return (
    <Grid sx={{ ...styles.root, ...props.sx }} id="download">
      <Grid container sx={styles.grid} boxShadow={3} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" sx={styles.title}>
            Ready to use ?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" sx={styles.description}>
            You are 5 mins away frm your own question/answer site
          </Typography>
        </Grid>
        <Grid item md={8} xs={12}>
          <ControlledAccordion />
        </Grid>
      </Grid>
    </Grid>
  );
}
