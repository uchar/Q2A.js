import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Header from './Header/Header';
import JssStylesProvider from '../../common/layouts/JssStylesProvider';
import Footer from '../../common/layouts/Footer';

const styles = {
  layoutStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
  },
};

const Layout = (props) => {
  return (
    <JssStylesProvider>
      <Box sx={styles.layoutStyle}>
        <Header />
        <Box>{props.children}</Box>
        <Footer />
      </Box>
    </JssStylesProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};
export default Layout;
