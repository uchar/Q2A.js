import React from 'react';
import { Badge, Box, IconButton, Typography } from '@material-ui/core';
import Translate from '@material-ui/icons/Translate';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationIcon from '@material-ui/icons/Notifications';
import { useSelector } from 'react-redux';
import ProfileImage from '../../../components/ProfileImage';
import Drawer from './Drawer';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  more: {
    alignSelf: 'center',
  },
};

// eslint-disable-next-line complexity
const Header = ({
  listData,
  user,
  handleProfileMenuOpen,
  handleLanguageMenuOpen,
  handleThemeChange,
  handleNotificationMenuOpen,
  notificationCount,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const themeType = useSelector((state) => state.currentUser.theme);

  const toggleDrawer = (state) => () => {
    setIsDrawerOpen(state);
  };
  return (
    <Box sx={styles.root}>
      <Drawer isMobileMenuOpen={isDrawerOpen} toggleDrawer={toggleDrawer} listData={listData} />
      <Box sx={styles.more}>
        <IconButton
          aria-label="show more"
          aria-haspopup="true"
          onClick={toggleDrawer(true)}
          color="inherit"
          size="small"
        >
          <MoreIcon size="small" />
        </IconButton>
      </Box>
      {user && handleProfileMenuOpen && (
        <IconButton edge="end" aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
          <ProfileImage showMedal={false} size={24} profileImage={user.profileImage}></ProfileImage>
          <Typography style={{ marginTop: 5, marginRight: 2, fontSize: 12 }}>{user.publicName}</Typography>
        </IconButton>
      )}
      {handleLanguageMenuOpen && (
        <IconButton color="inherit" onClick={handleLanguageMenuOpen}>
          <Translate />
        </IconButton>
      )}
      {handleThemeChange && (
        <IconButton color="inherit" onClick={handleThemeChange}>
          <img
            style={{ width: '18px', height: '18px' }}
            src={themeType && themeType === 'dark' ? '/images/day_icon.png' : '/images/night_icon.png'}
          />
        </IconButton>
      )}

      {user && notificationCount && (
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
