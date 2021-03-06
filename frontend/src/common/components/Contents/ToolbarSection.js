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

const getItem = (title, onClick, style) => {
  return (
    <Typography variant="button" color="textSecondary" sx={style} onClick={onClick}>
      {title}
    </Typography>
  );
};
const ToolbarSection = ({
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
  active,
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
          active ? getStrings().POST_TOOLBAR_DEACTIVE : getStrings().POST_TOOLBAR_ACTIVE,
          async (event) => {
            return disableCallback(event);
          },
          styles.item
        )}
    </Grid>
  );
};

ToolbarSection.defaultProps = {
  showShare: true,
  showEdit: false,
  showComment: false,
  showDisable: false,
};
ToolbarSection.propTypes = {
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
  active: PropTypes.bool.isRequired,
};
export default ToolbarSection;
