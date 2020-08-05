import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(1, 2, 1, 1),
    cursor: 'pointer',
    borderColor: '#f2f2f2',
    '&:hover': {
      background: '#3f51b5',
      color: 'white',
      borderColor: '#314285',
    },
  },
}));

export default function Tag(props) {
  const classes = useStyles();
  const { tag, count } = props;
  const label = count ? `${tag}  ${count}` : tag;
  return (
    <Link prefetch={false} href="/tag/[tag]" as={`/tag/${tag}`}>
      <Box boxShadow={1} border={1} className={classes.box}>
        <Typography style={{ fontSize: 10 }}>{label}</Typography>
      </Box>
    </Link>
  );
}
