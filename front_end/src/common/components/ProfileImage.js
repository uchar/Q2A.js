import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Tooltip } from '@material-ui/core';

import Link from 'next/link';
import { getFullUrl } from '../utlities/generalUtilities';
// import Medal from './Medal';

const useStyles = (size) =>
  makeStyles((theme) => ({
    avatar: {
      width: size,
      height: size,
      backgroundColor: 'white',
      marginRight: theme.spacing(1),
      cursor: 'pointer',
    },
    medalSection: {
      flexDirection: 'row',
      marginTop: theme.spacing(-1.7),
      justifyContent: 'flex-start',
      display: 'flex',
      marginLeft: theme.spacing(1.6),
    },
    medal: {
      marginRight: theme.spacing(0.3),
      zIndex: 9,
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

const ProfileImage = ({ profileImage, size, href, as, showMedal, tooltip }) => {
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
  // imageComponent = (
  //   <div>
  //     {imageComponent}
  //     {showMedal && score && (
  //       <div>
  //         {/* <div className={classes.medalSection}> */}
  //         {/*  <Medal className={classes.medal} backgroundColor="#CD7F32" color="white" count={'8'} /> */}
  //         {/*  <Medal className={classes.medal} backgroundColor="silver" color="black" count={'22'} /> */}
  //         {/*  <Medal className={classes.medal} backgroundColor="yellow" color="black" count={'2'} /> */}
  //         {/* </div> */}
  //         <Typography align={'center'} className={classes.score} variant="button">
  //           {`${score} امتیاز`}
  //         </Typography>
  //       </div>
  //     )}
  //   </div>
  // );
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
  showMedal: true,
};

export default ProfileImage;
