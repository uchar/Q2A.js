import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Tag from './Tag';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2), textAlign: 'center' },
}));

export default function TagsList({ tags }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify={'center'} spacing={2}>
        {tags &&
          tags.map((tag) => (
            <Grid item key={tag.id}>
              <Tag tag={tag.title} count={tag.used} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
TagsList.propTypes = {
  tags: PropTypes.array.isRequired,
};
