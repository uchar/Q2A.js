import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  root: {
    padding: '5px 10px 5px 10px',
    backgroundColor: '#f2f2f2',
  },
}));

export default function Tag(props) {
  const classes = useStyles();
  const { tag, count } = props;
  const label = count ? `${tag} x ${count}` : tag;
  return (
    <Box boxShadow={1} borderColor="#f2f2f2" border={1} className={classes.root}>
      <Typography style={{ fontSize: 10 }}>{label}</Typography>
    </Box>
  );
}
