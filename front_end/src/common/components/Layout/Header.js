import React from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import Translate from '@material-ui/icons/Translate';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { getStrings } from '../../utilities';

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
    margin: '0px 12px 0px 12px',
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
  paper: {
    marginRight: theme.spacing(2),
  },
  notificationsMenu: {
    maxWidth: '360px',
    backgroundColor: '#ebebeb',
  },
}));

function createData(name) {
  return { name };
}

const rows = [createData('Answer'), createData('Answer'), createData('election')];

export default function Header({ store }) {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const { themeType } = selector.client;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isLanguageMenuOpen = Boolean(languageAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
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

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
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
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

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
      dispatch({ type: 'CLIENT_SIDE_THEME_TYPE', payload: 'light' });
    } else {
      dispatch({ type: 'CLIENT_SIDE_THEME_TYPE', payload: 'dark' });
    }
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [notification, setNotification] = React.useState(null);
  const [notificationText, setNotificationText] = React.useState([
    {
      id: 1,
      name: 'answer',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'comment',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'comment',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'comment',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'comment',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'comment',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
    {
      id: 1,
      name: 'comment',
      date: '7/19/2020',
      question: ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
      answer:
        ' تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست  تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست رشته ای به عددی و برعکس تبدیل لیست',
    },
  ]);
  const handleClick = (event) => {
    setNotification(event.currentTarget);
  };

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <div className={classes.grow}>
      <AppBar color="background.default" position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography style={{ cursor: 'pointer' }} className={classes.title} variant="h6" noWrap>
              {getStrings().TITLE}
            </Typography>
          </Link>

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
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <Badge badgeContent={17} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              style={{ maxWidth: '500px' }}
              id="simple-menu"
              anchorEl={notification}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              open={Boolean(notification)}
              onClose={handleClose}
            >
              {notificationText.map((row) => (
                <Box
                  boxShadow={1}
                  style={{ cursor: 'pointer', padding: '10px', margin: '10px 10px 10px 10px' }}
                >
                  <div
                    style={{
                      justifyContent: 'space-between',
                      display: 'flex',
                    }}
                  >
                    <Typography color={'textSecondary'} style={{ fontSize: '12px' }}>
                      {row.date}
                    </Typography>
                    <Typography color={'textSecondary'} style={{ fontSize: '12px' }}>
                      {row.name}
                    </Typography>
                  </div>

                  <Typography color={'textPrimary'} style={{ wordWrap: 'wordBreak', textAlign: 'right' }}>
                    {row.question}
                  </Typography>
                  <Typography
                    color={'textSecondary'}
                    style={{ wordWrap: 'wordBreak', fontSize: '12px', textAlign: 'right' }}
                  >
                    {row.answer}
                  </Typography>
                </Box>
              ))}
            </Menu>
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleLanguageMenuOpen}>
              <Translate />
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleDarkChange}>
              {
                <img
                  onClick={handleDarkChange}
                  style={{ width: '24px', height: '24px' }}
                  src={themeType && themeType === 'dark' ? '/images/day_icon.png' : '/images/night_icon.png'}
                />
              }
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
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
      {renderMenu}
      {renderLanguageMenu}
    </div>
  );
}
export const getServerSideProps = () => {};
