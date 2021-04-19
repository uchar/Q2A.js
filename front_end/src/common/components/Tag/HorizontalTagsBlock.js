import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Tag from './Tag';
import { DeepMemo } from '../../utlities/generalUtilities';

const styles = {
  root: { display: 'flex', flexDirection: 'row' },
  tag: {
    marginLeft: (theme) => theme.spacing(1),
  },
};

const HorizontalTagsBlock = DeepMemo(function HorizontalTagsBlock({ sx, tags }) {
  return (
    <Box sx={{ ...sx, ...styles.root }}>
      {tags.map((tag) => (
        <Tag tag={tag} sx={styles.tag} key={tag} />
      ))}
    </Box>
  );
});
HorizontalTagsBlock.propTypes = {
  tags: PropTypes.array.isRequired,
};
export default HorizontalTagsBlock;
