import React from 'react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Header from './Header/Header';
import Footer from './Footer';
import RTL from './RTL';
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

const AskLayout = (props) => {
  return (
    <RTL>
      <div style={layoutStyle} dir="rtl">
        <Header />
        <Box style={contentStyle}>
          <Grid direction="row" justify={'center'} container spacing={2}>
            <Grid item md={0} xs={12}></Grid>
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
    </RTL>
  );
};

export default AskLayout;
