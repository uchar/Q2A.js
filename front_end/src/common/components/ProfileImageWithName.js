import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { DeepMemo, timeAgo } from '../utlities/generalUtilities';
import { getLanguage, getStrings } from '../utlities/languageUtilities';
import ProfileImage from './ProfileImage';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', flexDirection: 'row', textAlign: 'left' },
  nameDateSection: { marginTop: theme.spacing(2) },
  name: {
    cursor: 'pointer',
    marginRight: theme.spacing(1),
  },
  date: { marginRight: theme.spacing(1) },
  medalSection: {
    flexDirection: 'row',
    marginTop: '2px',
    justifyContent: 'flex-start',
    display: 'flex',
  },
  medal: {
    marginRight: theme.spacing(1),
  },
}));

const ProfileImageWithName = DeepMemo(function ({ profileImage, href, createdAt, publicName, score }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProfileImage
        href={`${href}`}
        profileImage={profileImage}
        showMedal
        tooltip={`${publicName} تا به حال ${score} امتیاز گرفته است `}
      />
      <div className={classes.nameDateSection}>
        <Link prefetch={false} href={href}>
          <Typography variant="subtitle1" color="textPrimary" className={classes.name}>
            {publicName}
          </Typography>
        </Link>
        <Typography variant="subtitle2" color="textSecondary" className={classes.date}>
          {timeAgo(createdAt, getLanguage())}
          {getStrings().DEMO_TIME_AGO_QUESTION}
        </Typography>
      </div>
    </div>
  );
});
ProfileImageWithName.propTypes = {
  profileImage: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  publicName: PropTypes.string,
  score: PropTypes.number,
};
export default ProfileImageWithName;
