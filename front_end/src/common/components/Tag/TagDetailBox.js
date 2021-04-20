import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { DeepMemo } from '../../utlities/generalUtilities';
import Tag from './Tag';

const styles = {
  root: {
    padding: (theme) => theme.spacing(1, 1, 1, 1),
    display: 'flex',
    flex: 1,
    marginTop: (theme) => theme.spacing(3),
    flexDirection: 'column',
    height: '200px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 0px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 0px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '0px solid slategrey',
    },
  },
  description: {
    flex: 1,
    margin: (theme) => theme.spacing(1, 2, 0, 2),
    textAlign: 'initial ',
    fontWeight: 500,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  tag: {},
  tagParent: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: (theme) => theme.spacing(1, 2, 1, 2),
  },
};

const TagDetailBox = DeepMemo(function TagDetailBox(props) {
  const { tag, count, description } = props;
  return (
    <Box boxShadow={2} sx={styles.root}>
      <Box sx={styles.tagParent}>
        <Tag sx={styles.tag} tag={tag} count={count} />
      </Box>
      <Typography sx={styles.description}>{description}</Typography>
    </Box>
  );
});
TagDetailBox.propTypes = {
  tag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
export default TagDetailBox;
