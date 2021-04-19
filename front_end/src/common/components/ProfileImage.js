import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Tooltip } from '@material-ui/core';

import Link from 'next/link';
import PropTypes from 'prop-types';
import { getFullUrl } from '../utlities/generalUtilities';

const useStyles = (size) =>
  makeStyles((theme) => ({
    avatar: {
      width: size,
      height: size,
      backgroundColor: 'white',
      marginRight: theme.spacing(1),
      cursor: 'pointer',
    },
    score: {
      fontSize: '9px',
      fontWeight: '800',
      flex: 1,
      display: 'flex',
      marginLeft: theme.spacing(2.2),
      marginTop: theme.spacing(0.3),
    },
  }))();

const ProfileImage = ({ profileImage, size, href, tooltip }) => {
  const classes = useStyles(size);
  let imageComponent;
  if (profileImage) {
    imageComponent = (
      <div>
        <Avatar aria-label="recipe" className={classes.avatar} src={getFullUrl(profileImage)}>
          <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />
        </Avatar>
      </div>
    );
  } else {
    imageComponent = (
      <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />
    );
  }
  if (tooltip) {
    imageComponent = (
      <Tooltip dir={'rtl'} title={`${tooltip}`}>
        {imageComponent}
      </Tooltip>
    );
  }
  if (href) {
    return (
      <Link prefetch={false} href={href}>
        {imageComponent}
      </Link>
    );
  }
  return imageComponent;
};

ProfileImage.defaultProps = {
  size: 60,
};
ProfileImage.propTypes = {
  profileImage: PropTypes.string,
  href: PropTypes.string,
  tooltip: PropTypes.string,
  size: PropTypes.number,
};
export default ProfileImage;
