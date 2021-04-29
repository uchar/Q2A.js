import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { isSiteRTL } from '../../../utlities/languageUtilities';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    padding: (theme) => theme.spacing(5, 5),
    color: (theme) => theme.palette.text.primary,
  },
  a: {
    textDecoration: 'none',
  },
};

const Drawer = ({ isMobileMenuOpen, toggleDrawer, listData }) => {
  const anchor = isSiteRTL() ? 'right' : 'left';
  const list = () => (
    <Box sx={styles.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      {listData?.map((item) => (
        <Link key={item.id} href={item.path}>
          <a style={styles.a}>
            <Typography sx={styles.paper}>{item.label}</Typography>
          </a>
        </Link>
      ))}
    </Box>
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

export default Drawer;
