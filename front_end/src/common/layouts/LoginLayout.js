import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
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
  grid: { margin: '70px 0px 110px 0px' },
}));
const LoginLayout = (props) => {
  const classes = useStyles();

  return (
    <Layout noSideBar>
      <Grid container justify="center" alignItems={'center'} className={classes.grid}>
        <Grid item display={{ xs: 'none' }} sm={3} />
        <Grid item xs={12} sm={6}>
          <Box boxShadow={3} className={classes.paper}>
            <Box boxShadow={1} className={classes.box}>
              <Typography component="h3" variant="h3" style={{ paddingBottom: '2.3rem', marginTop: '2rem' }}>
                {props.pageTitle}
              </Typography>
            </Box>

            <div className={classes.form}>{props.children}</div>
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
