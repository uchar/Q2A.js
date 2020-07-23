import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  root: {
    padding: '5px 10px 5px 10px',
    cursor: 'pointer',
  },
}));

export default function Tag(props) {
  const classes = useStyles();
  const { tag, count } = props;
  const label = count ? `${tag}  ${count}` : tag;
  return (
    <Link prefetch={false} href="/tag/[tag]" as={`/tag/${tag}`}>
      <Box boxShadow={1} borderColor="#f2f2f2" border={1} className={classes.root}>
        <Typography style={{ fontSize: 10 }}>{label}</Typography>
      </Box>
    </Link>
  );
}
