import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ShareDialog from '../ShareDialog';
import { getStrings } from '../../utlities/languageUtilities';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', padding: theme.spacing(3, 2, 1, 0) },
  item: {
    textDecorationLine: 'underline',
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
}));

const getItem = (title, onClick, className) => {
  return (
    <Typography variant="button" color="textSecondary" className={className} onClick={onClick}>
      {title}
    </Typography>
  );
};
const PostToolbar = ({
  className,
  showShare,
  shareTitle,
  shareBody,
  showEdit,
  editCallBack,
  showComment,
  commentCallback,
  showDisable,
  disableCallback,
}) => {
  const classes = useStyles();
  const [shareAnchor, setShareAnchor] = React.useState(null);

  const handleCloseShare = () => {
    setShareAnchor(undefined);
  };

  return (
    <Grid container className={`${classes.root} ${className}`} spacing={1} direction="row" justify="flex-end">
      <ShareDialog
        shareTitle={shareTitle}
        shareBody={shareBody}
        anchor={shareAnchor}
        handleClose={handleCloseShare}
      />
      {showShare &&
        getItem(
          getStrings().POST_TOOLBAR_SHARE,
          (event) => {
            setShareAnchor(event.currentTarget);
          },
          classes.item
        )}
      {showEdit &&
        getItem(
          getStrings().POST_TOOLBAR_EDIT,
          (event) => {
            editCallBack(event);
          },
          classes.item
        )}
      {showComment &&
        getItem(
          getStrings().POST_TOOLBAR_COMMENT,
          (event) => {
            commentCallback(event);
          },
          classes.item
        )}
      {showDisable &&
        getItem(
          getStrings().POST_TOOLBAR_DEACTIVE,
          (event) => {
            disableCallback(event);
          },
          classes.item
        )}
    </Grid>
  );
};

PostToolbar.defaultProps = {
  showShare: true,
  showEdit: false,
  showComment: false,
  showDisable: false,
};
PostToolbar.propTypes = {
  className: PropTypes.string,
  showShare: PropTypes.bool.isRequired,
  shareTitle: PropTypes.string.isRequired,
  shareBody: PropTypes.string.isRequired,
  showEdit: PropTypes.bool.isRequired,
  editCallBack: PropTypes.func.isRequired,
  showComment: PropTypes.bool.isRequired,
  commentCallback: PropTypes.func.isRequired,
  showDisable: PropTypes.bool.isRequired,
  disableCallback: PropTypes.func.isRequired,
};
export default PostToolbar;
