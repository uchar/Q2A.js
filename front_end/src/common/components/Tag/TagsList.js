import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tag from './Tag';
import { getStrings } from '../../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2), textAlign: 'center' },
  moreText: {
    paddingTop: theme.spacing(15),
    fontSize: '14px',
    color: 'blue',
    '&:hover': {
      color: 'black',
      cursor: 'pointer',
    },
  },
}));

export default function TagsList({ tags }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify={'center'} border={1} spacing={2}>
        {tags &&
          tags.map((tag) => (
            <Grid item key={tag.id}>
              <Tag tag={tag.title} count={tag.used} />
            </Grid>
          ))}
      </Grid>
      <Typography bold color={'black'} className={classes.moreText} variant={'button'}>
        {'More...'}
      </Typography>
    </div>
  );
}
