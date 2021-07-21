import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { DeepMemo } from '../../utlities/generalUtilities';

const styles = {
  box: {
    padding: (theme) => theme.spacing(0, 2, 0, 2),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    // background: '#e1ecf4',
    // borderColor: '#f2f2f2',
    '&:hover': {
      background: '#3f51b5',
      color: 'white',
      borderColor: '#314285',
    },
  },
  tagText: {
    fontSize: 10,
  },
};

const Tag = DeepMemo(function Tag(props) {
  const { tag, count } = props;
  const label = count ? `${tag} x${count}` : tag;
  return (
    <Link prefetch={false} href={`/tag/${encodeURIComponent(tag)}`}>
      <Box boxShadow={1} sx={{ ...props.sx, ...styles.box }}>
        <Typography sx={styles.tagText}>{label}</Typography>
      </Box>
    </Link>
  );
});
Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  count: PropTypes.number,
};
export default Tag;
