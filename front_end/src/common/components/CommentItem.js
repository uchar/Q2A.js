import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import { parseContent } from '../parsers/parser';

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

export default function CommentItem({ content, user }) {
  const classes = useStyles();
  const { publicName, profileImage } = user;

  const parsedContent = parseContent(content, 'inline');
  return (
    <div
      style={{
        margin: '15px 15px 10px 20px',
        flex: 1,
        textAlign: 'right',
        flexDirection: 'row',
        display: 'flex',
      }}
    >
      <div> {parsedContent}</div>

      <Link prefetch={false} href={`/user/[id]`} as={`/user/${publicName}`}>
        <Typography
          style={{
            fontSize: '12px',
            textDecorationLine: 'underline',
            cursor: 'pointer',
            color: '#ff00ee',
            margin: '18px 0px 10px 0px',
          }}
        >
          {publicName}
        </Typography>
      </Link>
    </div>
  );
}
