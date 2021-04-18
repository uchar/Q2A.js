import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { isLanguageRtl } from '../../utlities/generalUtilities';
import { getLanguage, isSiteRTL } from '../../utlities/languageUtilities';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const MobileMenuDrawer = ({ isMobileMenuOpen, toggleDrawer }) => {
  const anchor = isSiteRTL() ? 'right' : 'left';
  const classes = useStyles();
  const list = () => (
    <div
      className={clsx(classes.list)}
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
