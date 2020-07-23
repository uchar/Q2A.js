import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Translate from '@material-ui/icons/Translate';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Link from 'next/link';
import { getStrings } from '../../utilities';
import { CLIENT_SIDE_THEME_ACTION } from '../../../redux/constants';
import CardButton from '../CardButton/CardButton';
import { checkUser } from '../../../API/utilities';
import ProfileImage from '../ProfileImage';

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
    margin: '0px 25px 0px 12px',
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
    // vertical padding + font size from searchIcon
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
}));

export default function Header({ store }) {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const { themeType } = selector.client;
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(undefined);
  const isLanguageMenuOpen = Boolean(languageAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const router = useRouter();

  useEffect(() => {
    (async function anyNameFunction() {
      const userResult = await checkUser();
      setUser(userResult);
    })();
  }, []);
  const handleProfileMenuOpen = async (event) => {
    return router.push(`/user/${user.publicName}`);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const languageMenuId = 'language-menu';

  const handlePersianClicked = () => {
    handleLanguageMenuClose();
  };

  const handleEnglishClicked = () => {
    handleLanguageMenuClose();
  };

  const renderLanguageMenu = (
    <Menu
      anchorEl={languageAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={languageMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isLanguageMenuOpen}
      onClose={handleLanguageMenuClose}
    >
      <MenuItem onClick={handleEnglishClicked}>English</MenuItem>
      <MenuItem onClick={handlePersianClicked}>فارسی</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleLanguageMenuOpen}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Translate />
        </IconButton>
        <p>Language</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleDarkChange = () => {
    if (themeType === 'dark') {
      dispatch({ type: CLIENT_SIDE_THEME_ACTION, payload: 'light' });
    } else {
      dispatch({ type: CLIENT_SIDE_THEME_ACTION, payload: 'dark' });
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar color="background.default" position="static">
        <Toolbar>
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleLanguageMenuOpen}>
              <Translate />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleDarkChange}>
              <img
                onClick={handleDarkChange}
                style={{ width: '21px', height: '21px' }}
                src={themeType && themeType === 'dark' ? '/images/day_icon.png' : '/images/night_icon.png'}
              />
            </IconButton>
            {user && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{ marginRight: '2px' }}
              >
                <Badge badgeContent={25} max={2} color="secondary" style={{ fontSize: '12px' }}>
                  <ProfileImage size={26} profileImage={user.profileImage}></ProfileImage>
                </Badge>
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
              style={{ fontSize: '13px', height: '30%' }}
              url={'/login'}
              shouldShowLoading={false}
              text={'ورود'}
              backgroundColor={'secondary'}
            />
          )}
          {!user && user !== undefined && (
            <CardButton
              style={{ fontSize: '13px', height: '30%' }}
              url={'/register'}
              shouldShowLoading={false}
              text={'عضویت'}
              backgroundColor={'secondary'}
            />
          )}
          <Link prefetch={false} href="/">
            <Typography style={{ cursor: 'pointer' }} className={classes.title} variant="h5" noWrap>
              {getStrings().TITLE}
            </Typography>
          </Link>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderLanguageMenu}
    </div>
  );
}
