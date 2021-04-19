import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ShareDialog from '../ShareDialog';
import { getStrings } from '../../utlities/languageUtilities';

const styles = {
  root: { display: 'flex', padding: (theme) => theme.spacing(3, 3, 1, 3), justify: 'flex-end' },
  item: {
    textDecorationLine: 'underline',
    marginRight: (theme) => theme.spacing(2),
    cursor: 'pointer',
  },
};

const getItem = (title, onClick, className) => {
  return (
    <Typography variant="button" color="textSecondary" sx={className} onClick={onClick}>
      {title}
    </Typography>
  );
};
const PostToolbar = ({
  sx,
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
  const [shareAnchor, setShareAnchor] = React.useState(null);

  const handleCloseShare = () => {
    setShareAnchor(undefined);
  };

  return (
    <Grid container sx={{ ...sx, ...styles.root }} spacing={1}>
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
          styles.item
        )}
      {showEdit &&
        getItem(
          getStrings().POST_TOOLBAR_EDIT,
          (event) => {
            editCallBack(event);
          },
          styles.item
        )}
      {showComment &&
        getItem(
          getStrings().POST_TOOLBAR_COMMENT,
          (event) => {
            commentCallback(event);
          },
          styles.item
        )}
      {showDisable &&
        getItem(
          getStrings().POST_TOOLBAR_DEACTIVE,
          (event) => {
            disableCallback(event);
          },
          styles.item
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
  sx: PropTypes.object,
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
