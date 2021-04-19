import React, { useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { AppBar, Badge, IconButton, InputBase, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Translate from '@material-ui/icons/Translate';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationIcon from '@material-ui/icons/Notifications';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Link from 'next/link';
import Q2aButton from '../../components/Q2aButton';
import { getCurrentUser, doGraphQLMutation, updateCurrentUser } from '../../../API/utilities';
import ProfileImage from '../../components/ProfileImage';
import NotificationsBox from './NotificationsBox';
import Menu from './Menu';
import { getLanguage, getStrings } from '../../utlities/languageUtilities';
import { SET_READ_ALL_NOTIFICATIONS } from '../../../API/mutations';
import { CURRENT_USER_ACTION } from '../../../redux/constants';
import MobileMenuDrawer from './MobileMenuDrawer';

const styles = {
  grow: {
    flexGrow: 1,
  },
  appBar: {
    padding: (theme) => theme.spacing(2, 0, 2, 0),
  },
  menuButton: {
    marginRight: (theme) => theme.spacing(2),
  },
  title: {
    display: 'none',
    [(theme) => theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    margin: (theme) => theme.spacing(2, 2, 0, 2),
    fontSize: '20px',
    fontWeight: '500',
  },
  search: {
    display: 'none',
    [(theme) => theme.breakpoints.up('md')]: {
      padding: (theme) => theme.spacing(1, 0, 1, 0),
      display: 'block',
      position: 'relative',
      borderRadius: (theme) => theme.shape.borderRadius,
      backgroundColor: alpha('#ffffff', 0.3),
      '&:hover': {
        backgroundColor: alpha('#ffffff', 0.4),
      },
      marginRight: (theme) => theme.spacing(2),
      width: '90%',
      marginLeft: (theme) => theme.spacing(3),
    },
  },
  searchIcon: {
    padding: (theme) => theme.spacing(-1, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '5px',
    top: '0%',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: (theme) => theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${(theme) => theme.spacing(4)}px)`,
    transition: (theme) => theme.transitions.create('width'),
    width: '100%',
    [(theme) => theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  sectionDesktop: {
    [(theme) => theme.breakpoints.up('md')]: {
      display: 'flex',
      flex: '1',
    },
  },
  sectionMobile: {
    display: 'flex',
    [(theme) => theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  buttons: {
    fontSize: '13px',
    margin: (theme) => theme.spacing(1, 0, 1, 0),
  },
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

  const handleProfileMenuOpen = async (event) => {
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
    <div sx={styles.grow}>
      <MobileMenuDrawer isMobileMenuOpen={isMobileMenuOpen} toggleDrawer={toggleMobileMenu} />
      <AppBar color="secondary" sx={styles.appBar} position="static">
        <Toolbar>
          <NotificationsBox
            notificationAnchor={notificationAnchor}
            onClose={handleNotificationsMenuClose}
            onNotificationCountChange={handleNotificationCountChange}
          />
          <div sx={styles.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={toggleMobileMenu(true)}
              color="inherit"
              size="small"
            >
              <MoreIcon size="small" />
            </IconButton>
          </div>
          <div sx={styles.sectionDesktop}>
            <Link prefetch={false} href={`/`}>
              <Typography style={{ cursor: 'pointer' }} sx={styles.title} variant="h2" noWrap>
                {getStrings().SITE_TITLE}
              </Typography>
            </Link>
            {!user && user !== undefined && (
              <Q2aButton
                sx={styles.buttons}
                url={'/login'}
                shouldShowLoading={false}
                text={getStrings().HEADER_LOGIN_BUTTON}
                backgroundColor={'secondary'}
              />
            )}
            {!user && user !== undefined && (
              <Q2aButton
                sx={styles.buttons}
                url={'/register'}
                shouldShowLoading={false}
                text={getStrings().HEADER_REGISTER_BUTTON}
                backgroundColor={'secondary'}
              />
            )}
            <div sx={styles.search}>
              <div sx={styles.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={getStrings().SEARCH_HINT}
                classes={{
                  root: styles.inputRoot,
                  input: styles.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={styles.grow} />
          </div>
          {user && (
            <IconButton edge="end" aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
              <ProfileImage showMedal={false} size={32} profileImage={user.profileImage}></ProfileImage>
              <Typography style={{ marginTop: 8, marginRight: 2, fontSize: isMobile ? 12 : 14 }}>
                {user.publicName}
              </Typography>
            </IconButton>
          )}
          <IconButton color="inherit" onClick={handleLanguageMenuOpen}>
            <Translate />
          </IconButton>
          <IconButton color="inherit" onClick={handleThemeChange}>
            <img
              style={{ width: '21px', height: '21px' }}
              src={themeType && themeType === 'dark' ? '/images/day_icon.png' : '/images/night_icon.png'}
            />
          </IconButton>
          {user && (
            <IconButton
              edge="end"
              onClick={handleNotificationMenuOpen}
              color="inherit"
              style={{ marginRight: '2px' }}
            >
              <Badge badgeContent={notificationCount} max={9} color="secondary" style={{ fontSize: '12px' }}>
                <NotificationIcon />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        open={isLanguageMenuOpen}
        anchorEl={languageAnchorEl}
        onClose={handleLanguageMenuClose}
        onItemClick={handleMenuLanguageItemClick}
        items={[{ name: 'English' }, { name: 'Persian' }]}
      />
    </div>
  );
};

export default Header;
