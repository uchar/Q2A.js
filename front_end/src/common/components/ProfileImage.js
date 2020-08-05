import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

import Link from 'next/link';
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
  }))();

const ProfileImage = ({ profileImage, size, href, as }) => {
  const classes = useStyles(size);
  let imageComponent;
  if (profileImage) {
    imageComponent = (
      <Avatar aria-label="recipe" className={classes.avatar} src={getFullUrl(profileImage)}>
        <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />
      </Avatar>
    );
  } else {
    imageComponent = (
      <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />
    );
  }
  if (href) {
    return (
      <Link prefetch={false} href={href} as={as}>
        {imageComponent}
      </Link>
    );
  }
  return imageComponent;
};

ProfileImage.defaultProps = {
  size: 60,
};

export default ProfileImage;
