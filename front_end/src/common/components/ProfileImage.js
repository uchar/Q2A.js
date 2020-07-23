import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';

import { getProfileImage } from '../utilities';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    marginRight: '5px',
    cursor: 'pointer',
  },
}));

export default function ProfileImage({ profileImage }) {
  const classes = useStyles();
  if (!profileImage) {
    return <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />;
  }
  return (
    <Avatar aria-label="recipe" className={classes.avatar} src={getProfileImage(profileImage)}>
      <Avatar aria-label="recipe" className={classes.avatar} src={'/images/default_profile.jpg'} />
    </Avatar>
  );
}
