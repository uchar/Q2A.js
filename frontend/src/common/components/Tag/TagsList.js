import React from 'react';
import { Grid, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Tag from './Tag';

const styles = {
  root: { padding: (theme) => theme.spacing(2), textAlign: 'center' },
};

export default function TagsList({ tags }) {
  return (
    <Box sx={styles.root}>
      <Grid container justify={'center'} spacing={2}>
        {tags &&
          tags.map((tag) => (
            <Grid item key={tag.id}>
              <Tag tag={tag.title} count={tag.used} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
TagsList.propTypes = {
  tags: PropTypes.array.isRequired,
};
