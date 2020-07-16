import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '25px',
    paddingBottom: '15px',
  },
  avatar: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    marginRight: '15px',
  },
}));

export default function CommentItem({ content, creator }) {
  const classes = useStyles();
  return (
    <div style={{ margin: '20px 15px 10px 15px', flex: 1, textAlign: 'right', flexDirection: 'row' }}>
      <Typography color="textPrimary" display="inline" style={{ fontSize: '16px' }}>
        {`${content} - `}
      </Typography>
      <Typography
        display="inline"
        style={{ textDecorationLine: 'underline', cursor: 'pointer', color: '#ff00ee' }}
      >
        {creator}
      </Typography>
    </div>
  );
}
