import React, { useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../../API/utilities';
import { CURRENT_USER_ACTION } from '../../../redux/constants';
import Drawer from '../../../common/layouts/Header/Mobile/Drawer';
import MobileHeader from '../../../common/layouts/Header/Mobile/MobileHeader';
import BrowserHeader from './Browser/BrowserHeader';

const styles = {
  grow: {
    flexGrow: 1,
  },
  appBar: {
  },
  headerParent: { flex: 1 },
};
const listData = [
  {
    id: 0,
    path: '#home',
    label: 'Home',
  },
  {
    id: 1,
    path: '#features',
    label: 'Services',
  },

  {
    id: 2,
    path: '#download',
    label: 'Download',
  },

  {
    id: 3,
    path: '#blog',
    label: 'Blog',
  },
];
const Header = () => {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const refreshUser = async () => {
    const userResult = await getCurrentUser();
    dispatch({ type: CURRENT_USER_ACTION, payload: userResult });
  };

  useEffect(() => {
    (async function () {
      return refreshUser();
    })();
  }, []);

  const toggleMobileMenu = (state) => () => {
    setIsMobileMenuOpen(state);
  };

  return (
    <Box sx={styles.grow}>
      <Drawer isMobileMenuOpen={isMobileMenuOpen} toggleDrawer={toggleMobileMenu} listData={listData} />
      <AppBar color="secondary" sx={styles.appBar} position="static">
        <Toolbar sx={styles.grow}>
          <MobileView style={styles.headerParent}>
            <MobileHeader listData={listData} />
          </MobileView>
          <BrowserView style={styles.headerParent}>
            <BrowserHeader listData={listData} />
          </BrowserView>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
