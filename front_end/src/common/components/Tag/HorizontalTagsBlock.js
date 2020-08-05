import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tag from './Tag';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', flexDirection: 'row' },
  tag: {
    marginLeft: theme.spacing(1),
  },
}));

const HorizontalTagsBlock = ({ className, tags }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className}`}>
      {tags.map((tag) => (
        <div className={classes.tag} key={tag}>
          <Tag tag={tag} />
        </div>
      ))}
    </div>
  );
};

export default HorizontalTagsBlock;
