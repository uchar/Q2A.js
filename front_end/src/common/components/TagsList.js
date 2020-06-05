import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tag from './Tag';

const useStyles = makeStyles((theme) => ({
  root: { padding: '10px' },
}));

export default function TagsList() {
  const classes = useStyles();
  return (
    <Grid container justify={'center'} border={1} spacing={2} className={classes.root}>
      <Grid item>
        <Tag tag="C++" count={1345} />
      </Grid>
      <Grid item>
        <Tag tag="Java" count={135} />
      </Grid>
      <Grid item>
        <Tag tag="C#" count={755} />
      </Grid>
      <Grid item>
        <Tag tag="OpenCV" count={45} />
      </Grid>
      <Grid item>
        <Tag tag="Python" count={215} />
      </Grid>
      <Grid item>
        <Tag tag="JavaScripts" count={124} />
      </Grid>
      <Grid item>
        <Tag tag="Optimization" count={125} />
      </Grid>
      <Grid item>
        <Tag tag="C++" count={1345} />
      </Grid>
      <Grid item>
        <Tag tag="Java" count={135} />
      </Grid>
      <Grid item>
        <Tag tag="C#" count={755} />
      </Grid>
      <Grid item>
        <Tag tag="OpenCV" count={45} />
      </Grid>
      <Grid item>
        <Tag tag="Python" count={215} />
      </Grid>
      <Grid item>
        <Tag tag="JavaScripts" count={124} />
      </Grid>
      <Grid item>
        <Tag tag="C++" count={1345} />
      </Grid>
      <Grid item>
        <Tag tag="Java" count={135} />
      </Grid>
      <Grid item>
        <Tag tag="C#" count={755} />
      </Grid>
      <Grid item>
        <Tag tag="OpenCV" count={45} />
      </Grid>
      <Grid item>
        <Tag tag="Python" count={215} />
      </Grid>
      <Grid item>
        <Tag tag="JavaScripts" count={124} />
      </Grid>
      <Grid item>
        <Tag tag="C++" count={1345} />
      </Grid>
      <Grid item>
        <Tag tag="Java" count={135} />
      </Grid>
      <Grid item>
        <Tag tag="C#" count={755} />
      </Grid>
      <Grid item>
        <Tag tag="OpenCV" count={45} />
      </Grid>
      <Grid item>
        <Tag tag="Python" count={215} />
      </Grid>
      <Grid item>
        <Tag tag="JavaScripts" count={124} />
      </Grid>
      <Grid item>
        <Tag tag="C++" count={1345} />
      </Grid>
      <Grid item>
        <Tag tag="Java" count={135} />
      </Grid>
      <Grid item>
        <Tag tag="C#" count={755} />
      </Grid>
      <Grid item>
        <Tag tag="OpenCV" count={45} />
      </Grid>
      <Grid item>
        <Tag tag="Python" count={215} />
      </Grid>
      <Grid item>
        <Tag tag="JavaScripts" count={124} />
      </Grid>
      <Grid item>
        <Tag tag="C++" count={1345} />
      </Grid>
      <Grid item>
        <Tag tag="Java" count={135} />
      </Grid>
      <Grid item>
        <Tag tag="C#" count={755} />
      </Grid>
      <Grid item>
        <Tag tag="OpenCV" count={45} />
      </Grid>
      <Grid item>
        <Tag tag="Python" count={215} />
      </Grid>
      <Grid item>
        <Tag tag="JavaScripts" count={124} />
      </Grid>
    </Grid>
  );
}
