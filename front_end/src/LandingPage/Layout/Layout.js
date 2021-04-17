import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import JssStylesProvider from '../../common/layouts/JssStylesProvider';

const useStyles = makeStyles(() => ({
  layoutStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  return (
    <JssStylesProvider>
      <div className={classes.layoutStyle}>
        <Header />
        {props.children}
      </div>
    </JssStylesProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};
export default Layout;
