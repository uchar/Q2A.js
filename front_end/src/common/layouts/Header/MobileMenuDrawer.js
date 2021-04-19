import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {  isSiteRTL } from '../../utlities/languageUtilities';
import {Box} from "@material-ui/core";

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const MobileMenuDrawer = ({ isMobileMenuOpen, toggleDrawer }) => {
  const anchor = isSiteRTL() ? 'right' : 'left';
  const list = () => (
    <Box
      sx={styles.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    />
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={anchor}
          open={isMobileMenuOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default MobileMenuDrawer;
