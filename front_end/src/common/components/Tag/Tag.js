import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { DeepMemo } from '../../utlities/generalUtilities';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(1, 2, 1, 1),
    cursor: 'pointer',
    background: '#e1ecf4',
    borderColor: '#f2f2f2',
    '&:hover': {
      background: '#3f51b5',
      color: 'white',
      borderColor: '#314285',
    },
  },
  tagText: {
    fontSize: 10,
  },
}));

const Tag = DeepMemo(function Tag(props) {
  const classes = useStyles();
  const { tag, count } = props;
  const label = count ? `${tag} x${count}` : tag;
  return (
    <Link prefetch={false} href={`/tag/${encodeURIComponent(tag)}`}>
      <Box boxShadow={1} border={1} className={classes.box}>
        <Typography className={classes.tagText}>{label}</Typography>
      </Box>
    </Link>
  );
});
Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  count: PropTypes.number,
};
export default Tag;
