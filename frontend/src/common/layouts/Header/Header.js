import React, { useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { AppBar, Box, Toolbar } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { doGraphQLMutation, getCurrentUser, updateCurrentUser } from '../../../API/utility';
import NotificationsBox from './NotificationsBox';
import Menu from './Menu';
import { getLanguage } from '../../utlities/languageUtilities';
import { SET_READ_ALL_NOTIFICATIONS } from '../../../API/mutations';
import { CURRENT_USER_ACTION } from '../../../redux/constants';
import Drawer from './Mobile/Drawer';
import MobileHeader from './Mobile/MobileHeader';
import BrowserHeader from './Browser/BrowserHeader';

const styles = {
  grow: {
    flexGrow: 1,
  },
  appBar: {
    padding: (theme) => theme.spacing(2, 0, 2, 0),
  },
  headerParent: { flex: 1 },
};

const Header = () => {
  const themeType = useSelector((state) => state.currentUser.theme);
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [notificationCount, setNotificationCount] = React.useState(0);
  const isLanguageMenuOpen = Boolean(languageAnchorEl);
  const router = useRouter();
  const [notificationAnchor, setNotificationAnchor] = React.useState(null);

  const refreshUser = async () => {
    const userResult = await getCurrentUser();
    dispatch({ type: CURRENT_USER_ACTION, payload: userResult });
  };

  useEffect(() => {
    (async function () {
      return refreshUser();
    })();
  }, []);

  const handleProfileMenuOpen = async () => {
    return router.push(`/${getLanguage()}/user/${user.publicName}`);
  };
  const handleNotificationMenuOpen = async (event) => {
    setNotificationAnchor(event.currentTarget);
    setNotificationCount(0);
    return doGraphQLMutation(SET_READ_ALL_NOTIFICATIONS);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const toggleMobileMenu = (state) => () => {
    setIsMobileMenuOpen(state);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationAnchor(null);
  };

  const handleThemeChange = async () => {
    const newTheme = themeType === 'dark' ? 'light' : 'dark';
    dispatch({ type: CURRENT_USER_ACTION, payload: { theme: newTheme } });
    if ((await getCurrentUser()) !== false) {
      await updateCurrentUser({
        theme: newTheme,
      });
      return refreshUser();
    }
  };

  const handleNotificationCountChange = (count) => {
    setNotificationCount(count);
  };

  const handleMenuLanguageItemClick = async (newLanguage) => {
    handleLanguageMenuClose();
    let language = '';
    if (newLanguage.toLowerCase() === 'english') {
      language = 'en';
    } else {
      language = 'fa';
    }
    if (getLanguage() !== language) {
      try {
        await updateCurrentUser({
          language,
        });
      } catch (e) {
        console.log(e);
      }
      return router.push(router.asPath, router.asPath, { locale: language });
    }
  };

  return (
    <Box sx={styles.grow}>
      <Drawer isMobileMenuOpen={isMobileMenuOpen} toggleDrawer={toggleMobileMenu} />
      <AppBar color="secondary" sx={styles.appBar} position="static">
        <Toolbar sx={styles.grow}>
          <NotificationsBox
            notificationAnchor={notificationAnchor}
            onClose={handleNotificationsMenuClose}
            onNotificationCountChange={handleNotificationCountChange}
          />
          <MobileView style={styles.headerParent}>
            <MobileHeader
              user={user}
              handleLanguageMenuOpen={handleLanguageMenuOpen}
              handleNotificationMenuOpen={handleNotificationMenuOpen}
              handleProfileMenuOpen={handleProfileMenuOpen}
              handleThemeChange={handleThemeChange}
              notificationCount={notificationCount}
            />
          </MobileView>
          <BrowserView style={styles.headerParent}>
            <BrowserHeader
              user={user}
              handleLanguageMenuOpen={handleLanguageMenuOpen}
              handleNotificationMenuOpen={handleNotificationMenuOpen}
              handleProfileMenuOpen={handleProfileMenuOpen}
              handleThemeChange={handleThemeChange}
              notificationCount={notificationCount}
            />
          </BrowserView>
        </Toolbar>
      </AppBar>
      <Menu
        open={isLanguageMenuOpen}
        anchorEl={languageAnchorEl}
        onClose={handleLanguageMenuClose}
        onItemClick={handleMenuLanguageItemClick}
        items={[{ name: 'English' }, { name: 'Persian' }]}
      />
    </Box>
  );
};

export default Header;
