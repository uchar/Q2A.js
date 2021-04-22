import React from 'react';
import { alpha } from '@material-ui/core/styles';
import { Badge, Box, IconButton, InputBase, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Translate from '@material-ui/icons/Translate';
import NotificationIcon from '@material-ui/icons/Notifications';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Q2aButton from '../../../components/Q2aButton';
import ProfileImage from '../../../components/ProfileImage';
import { getStrings } from '../../../utlities/languageUtilities';
import SearchBar from '../SearchBar';

const styles = {
  root: {
    display: 'flex',
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'block',
    margin: (theme) => theme.spacing(1, 2, 0, 1),
    fontSize: '32px',
    fontWeight: '500',
    alignSelf: 'center',
  },
  search: {
    flex: 1,
    flexGrow: 1,
    margin: (theme) => theme.spacing(0, 3),
  },
  buttons: {
    fontSize: '13px',
    margin: (theme) => theme.spacing(1, 0, 1, 0),
  },
};

// eslint-disable-next-line complexity
const Header = ({
  user,
  handleProfileMenuOpen,
  handleLanguageMenuOpen,
  handleThemeChange,
  handleNotificationMenuOpen,
  notificationCount,
}) => {
  const themeType = useSelector((state) => state.currentUser.theme);

  return (
    <Box sx={styles.root}>
      <Link prefetch={false} href={`/`}>
        <Typography style={{ cursor: 'pointer' }} sx={styles.title} variant="h2" noWrap>
          {getStrings().SITE_TITLE}
        </Typography>
      </Link>
      <SearchBar sx={styles.search} />
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
      {user && (
        <IconButton edge="end" aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
          <ProfileImage showMedal={false} size={26} profileImage={user.profileImage}></ProfileImage>
          <Typography style={{ marginTop: 6, marginRight: 2, fontSize: 14 }}>{user.publicName}</Typography>
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
    </Box>
  );
};

export default Header;
