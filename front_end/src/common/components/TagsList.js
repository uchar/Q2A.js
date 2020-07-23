import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tag from './Tag';

const useStyles = makeStyles((theme) => ({
  root: { padding: '10px' },
}));

export default function TagsList({ tags }) {
  const classes = useStyles();
  return (
    <Grid container justify={'center'} border={1} spacing={2} className={classes.root}>
      {tags &&
        tags.map((tag) => (
          <Grid item key={tag.id}>
            <Tag tag={tag.title} count={tag.used} />
          </Grid>
        ))}
    </Grid>
  );
}
