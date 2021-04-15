import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tag from './Tag';
import { DeepMemo } from '../../utlities/generalUtilities';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', flexDirection: 'row' },
  tag: {
    marginLeft: theme.spacing(1),
  },
}));

const HorizontalTagsBlock = DeepMemo(function HorizontalTagsBlock({ className, tags }) {
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
});
HorizontalTagsBlock.propTypes = {
  tags: PropTypes.array.isRequired,
};
export default HorizontalTagsBlock;
