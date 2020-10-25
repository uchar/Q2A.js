import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Badge, IconButton, InputBase, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Translate from '@material-ui/icons/Translate';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationIcon from '@material-ui/icons/Notifications';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Link from 'next/link';
import CardButton from '../../components/CardButton';
import { getCurrentUser, doGraphQLMutation, updateCurrentUser } from '../../../API/utilities';
import ProfileImage from '../../components/ProfileImage';
import NotificationsBox from './NotificationsBox';
import Menu from './Menu';
import { getLanguage, getStrings } from '../../utlities/languageUtilities';
import { SET_READ_ALL_NOTIFICATIONS } from '../../../API/mutations';
import { CURRENT_USER_ACTION } from '../../../redux/constants';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    margin: theme.spacing(0, 5, 0, 2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: fade(theme.palette.background.default, 0.3),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  buttons: {
    fontSize: '13px',
    height: '30%',
  },
}));

const Header = ({}) => {
  const classes = useStyles();
  const themeType = useSelector((state) => state.currentUser.theme);
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationCount, setNotificationCount] = React.useState(0);
  const isLanguageMenuOpen = Boolean(languageAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const router = useRouter();
  const [notificationAnchor, setNotificationAnchor] = React.useState(null);

  const refreshUser = async () => {
    const userResult = await getCurrentUser();
    console.log('Dispatching refreshed user ', userResult);
    dispatch({ type: CURRENT_USER_ACTION, payload: userResult });
  };

  useEffect(() => {
    (async function () {
      return refreshUser();
    })();
  }, []);

  const handleProfileMenuOpen = async (event) => {
    return router.push(`/user/${user.publicName}`);
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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationAnchor(null);
  };

  const handleThemeChange = async () => {
    const newTheme = themeType === 'dark' ? 'light' : 'dark';
    await updateCurrentUser({
      theme: newTheme,
    });
    return refreshUser();
  };

  const handleNotificationCountChange = (count) => {
    setNotificationCount(count);
  };

  const handleMenuLanguageItemClick = async (newLanguage) => {
    handleLanguageMenuClose();
    let language = '';
    console.log(newLanguage);
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

      window.location.replace(`/${language}`);
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <NotificationsBox
            notificationAnchor={notificationAnchor}
            onClose={handleNotificationsMenuClose}
            onNotificationCountChange={handleNotificationCountChange}
          />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleLanguageMenuOpen}>
              <Translate />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleThemeChange}>
              <img
                style={{ width: '21px', height: '21px' }}
                src={themeType && themeType === 'dark' ? '/images/day_icon.png' : '/images/night_icon.png'}
              />
            </IconButton>
            {user && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleNotificationMenuOpen}
                color="inherit"
                style={{ marginRight: '2px' }}
              >
                <Badge
                  badgeContent={notificationCount}
                  max={9}
                  color="secondary"
                  style={{ fontSize: '12px' }}
                >
                  <NotificationIcon />
                </Badge>
              </IconButton>
            )}
            {user && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <ProfileImage showMedal={false} size={26} profileImage={user.profileImage}></ProfileImage>
                <Typography style={{ marginTop: 8, marginRight: 5, fontSize: isMobile ? 12 : 14 }}>
                  {user.publicName}
                </Typography>
              </IconButton>
            )}
          </div>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={getStrings().SEARCH_HINT}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {!user && user !== undefined && (
            <CardButton
              className={classes.buttons}
              url={'/login'}
              shouldShowLoading={false}
              text={'ورود'}
              backgroundColor={'secondary'}
            />
          )}
          {!user && user !== undefined && (
            <CardButton
              className={classes.buttons}
              url={'/register'}
              shouldShowLoading={false}
              text={'عضویت'}
              backgroundColor={'secondary'}
            />
          )}
          <Link prefetch={false} href="/" as="/">
            <Typography style={{ cursor: 'pointer' }} className={classes.title} variant="h2" noWrap>
              {getStrings().SITE_TITLE}
            </Typography>
          </Link>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
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
