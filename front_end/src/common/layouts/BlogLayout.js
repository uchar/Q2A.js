import React from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Header from './Header/Header';
import Footer from './Footer';
import JssStylesProvider from './JssStylesProvider';
import Expansion from '../components/Expansion';

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
};

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 2% 0px 2%',
};

const BlogLayout = (props) => {
  return (
    <JssStylesProvider>
      <div style={layoutStyle}>
        <Header />
        <Box style={contentStyle}>
          <Grid direction="row" justify={'center'} container spacing={2}>
            <Grid item display={{ xs: 'none' }} md={2}></Grid>
            <Grid item md={8} xs={12}>
              {props.children}
            </Grid>
            <Grid item md={2} display={{ xs: 'none' }} style={{ marginTop: '25px' }}></Grid>
          </Grid>
        </Box>
        <Footer />
      </div>
    </JssStylesProvider>
  );
};

export default BlogLayout;
