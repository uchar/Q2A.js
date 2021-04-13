import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { DeepMemo } from '../../utlities/generalUtilities';
import Tag from './Tag';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2, 0, 1),
    display: 'flex',
    flex: 1,
    marginTop: theme.spacing(3),
    flexDirection: 'column',
    height: '200px',
  },
  description: {
    flex: 1,
    margin: theme.spacing(1, 2, 0, 2),
    textAlign: 'initial ',
    fontWeight: 500,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  tag: {},
  tagParent: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: theme.spacing(1, 2, 1, 2),
  },
}));

const TagDetailBox = DeepMemo(function TagDetailBox(props) {
  const classes = useStyles();
  const { tag, count, description } = props;
  console.log('DESCRIPTION IS ', description);
  return (
    <Box boxShadow={2} className={classes.root}>
      <div className={classes.tagParent}>
        <Tag className={classes.tag} tag={tag} count={count} />
      </div>
      <Typography color={'black'} className={classes.description}>
        {description}
      </Typography>
    </Box>
  );
});

export default TagDetailBox;
