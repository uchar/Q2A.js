import React from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import Footer from './Footer';
import JssStylesProvider from './JssStylesProvider';
import Expansion from '../components/Expansion';

const useStyles = makeStyles((theme) => ({
  layoutStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
  },
  contentStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 2% 0px 2%',
  },
}));
const AskLayout = (props) => {
  const classes = useStyles();

  return (
    <JssStylesProvider>
      <div className={classes.layoutStyle}>
        <Header />
        <Box className={classes.contentStyle}>
          <Grid direction="row" justify={'center'} container spacing={2}>
            <Grid item display={{ md: 'none', xs: 'none' }} xs={12}></Grid>
            <Grid item md={8} xs={12}>
              {props.children}
            </Grid>
            <Grid item md={3} xs={12} style={{ marginTop: '25px' }}>
              <Expansion />
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </div>
    </JssStylesProvider>
  );
};
AskLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AskLayout;
