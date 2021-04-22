import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Layout from './Layout';

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '7px 7px 0 0',
    justify: 'center',
  },
  form: {
    width: '100%',
    marginTop: '1px',
    padding: '20px 50px 25px 50px',
  },
  box: {
    backgroundColor: 'background.paper',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  grid: { margin: '70px 0px 110px 0px', justifyContent: 'center', textAlign: 'center' },
  title: { paddingBottom: '2.3rem', marginTop: '2rem' },
};
const LoginLayout = (props) => {
  return (
    <Layout noSideBar>
      <Grid container sx={styles.grid}>
        <Grid item display={{ xs: 'none' }} sm={3} />
        <Grid item xs={12} sm={6}>
          <Box boxShadow={3} sx={styles.paper}>
            <Box boxShadow={1} sx={styles.box}>
              <Typography component="h3" variant="h3" style={styles.title}>
                {props.pageTitle}
              </Typography>
            </Box>
            <Box sx={styles.form}>{props.children}</Box>
          </Box>
        </Grid>
        <Grid item display={{ xs: 'none' }} sm={3} />
      </Grid>
    </Layout>
  );
};
LoginLayout.propTypes = {
  children: PropTypes.object.isRequired,
};
export default LoginLayout;
