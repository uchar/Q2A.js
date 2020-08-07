import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import { parseContent } from '../../parsers/parser';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 2, 1, 0),
    flex: 1,
    textAlign: 'right',
    flexDirection: 'row',
    display: 'flex',
  },
  name: {
    textDecorationLine: 'underline',
    cursor: 'pointer',
    color: '#ff00ee',
    fontSize: '10px',
    margin: theme.spacing(2.4, 0, 2, 0),
  },
}));

export default function CommentItem({ content, user }) {
  const classes = useStyles();
  const { publicName } = user;

  const parsedContent = parseContent(content, { fontSize: '12px' });
  return (
    <div className={classes.root}>
      <div> {parsedContent}</div>
      <Link prefetch={false} href={`/user/[id]`} as={`/user/${publicName}`}>
        <Typography variant="button" className={classes.name}>
          {publicName}
        </Typography>
      </Link>
    </div>
  );
}
