import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Tag from './Tag';
import { DeepMemo, getFirstItemFromJSON } from '../../utlities/generalUtilities';
import {
  ALL_TAGS_ACTION,
  EDIT_TAG_ACTION,
  ALERT_DIALOG_ACTION,
  ADD_TAG_ACTION,
} from '../../../redux/constants';
import { doGraphQLMutation, doGraphQLQuery, isAccessLevelEnough, USER_ACTIONS } from '../../../API/utility';
import { UPDATE_TAG, ADD_TAGS, INACTIVE_TAG } from '../../../API/mutations';
import { ALL_TAGS, GET_TAG } from '../../../API/queries';

const styles = {
  root: {
    padding: (theme) => theme.spacing(1, 1, 1, 1),
    display: 'flex',
    flex: 1,
    marginTop: (theme) => theme.spacing(3),
    flexDirection: 'column',
    height: '200px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 0px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 0px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '0px solid slategrey',
    },
  },
  description: {
    flex: 1,
    margin: (theme) => theme.spacing(2, 2, 0, 2),
    textAlign: 'justify ',
    fontWeight: 500,
    fontSize: 12,
    // alignSelf: 'flex-start',
  },
  tagParent: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: (theme) => theme.spacing(2, 2, 0, 2),
  },
  editSectionTag: {
    width: 'auto',
  },
  editSectionDescription: {
    margin: (theme) => theme.spacing(4, 2, 0, 2),
    width: '92%',
  },
  icon: {
    cursor: 'pointer',
    margin: (theme) => theme.spacing(0, 2, 0, 2),
  },
  boxIcon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const TagDetailBox = DeepMemo(function TagDetailBox(props) {
  const dispatch = useDispatch();
  const { tag, count, description, operationMode, id } = props;
  const [onClose, setOnClose] = React.useState(false);
  const [newTag, setNewTag] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');
  const [isAccessEnough, setIsAccessEnough] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  useEffect(() => {
    const getUserAccess = async () => {
      const isEnough = await isAccessLevelEnough(USER_ACTIONS.EDIT_TAG);
      setIsAccessEnough(isEnough);
    };
    getUserAccess();
  }, []);

  const refreshTags = async () => {
    const getData = await doGraphQLQuery(ALL_TAGS, { id });
    dispatch({ type: ALL_TAGS_ACTION, payload: getFirstItemFromJSON(getData) });
  };

  const handleSubmit = async () => {
    const params = {
      id,
      title: newTag,
      content: newDescription,
    };
    const mutation = operationMode === 'editMode' ? UPDATE_TAG : ADD_TAGS;
    const resultObject = await doGraphQLMutation(mutation, params);
    const result = getFirstItemFromJSON(resultObject);

    if (result.statusCode !== 'SUCCESS') {
      dispatch({
        type: ALERT_DIALOG_ACTION,
        payload: { showError: true, title: 'error', content: result.message },
      });
      return;
    }
    await refreshTags();
  };
  const handleCancel = async () => {
    if (operationMode === 'editMode') {
      dispatch({ type: EDIT_TAG_ACTION, payload: { operationMode: 'none', id } });
    } else {
      dispatch({ type: ADD_TAG_ACTION, payload: { operationMode: 'none', id } });
    }
    await refreshTags();
  };

  const handleTagChange = (event) => {
    setNewTag(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };
  const handleEdit = () => {
    setNewTag(tag);
    setNewDescription(description);
    dispatch({ type: EDIT_TAG_ACTION, payload: { operationMode: 'editMode', id } });
    setOnClose(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleInactive = async () => {
    setOpenDeleteDialog(false);
    await doGraphQLMutation(INACTIVE_TAG, { id });
    await refreshTags();
  };
  return (
    <Box boxShadow={2} sx={styles.root}>
      {operationMode === 'editMode' || operationMode === 'addMode' ? (
        <Box>
          <Box sx={styles.tagParent}>
            <TextField
              id="outlined-basic"
              label="Enter Tag"
              variant="outlined"
              size="small"
              sx={styles.editSectionTag}
              value={newTag}
              onChange={handleTagChange}
            />
            {!onClose && (
              <Box sx={styles.boxIcon}>
                <CloseIcon onClick={handleCancel} sx={styles.icon} color="primary" />
                <CheckIcon onClick={handleSubmit} style={{ cursor: 'pointer' }} color="primary" />
              </Box>
            )}
          </Box>
          <TextField
            sx={styles.editSectionDescription}
            id="outlined-multiline-static"
            label="Enter Description"
            multiline
            value={newDescription}
            variant="outlined"
            onChange={handleDescriptionChange}
          />
        </Box>
      ) : (
        <Box>
          <Box sx={styles.tagParent}>
            <Tag sx={styles.tag} tag={tag} count={count} />
            {isAccessEnough && (
              <Box sx={styles.boxIcon}>
                <DeleteIcon onClick={handleOpenDeleteDialog} sx={styles.icon} color="primary" />
                <EditIcon style={{ cursor: 'pointer' }} onClick={handleEdit} tag={tag} color="primary" />
                {openDeleteDialog && (
                  <Dialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Are you sure you want to delete this item?
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleInactive} color="primary" autoFocus>
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
              </Box>
            )}
          </Box>
          <Typography sx={styles.description}>{description}</Typography>
        </Box>
      )}
    </Box>
  );
});
TagDetailBox.defaultProps = {
  editMode: false,
};
TagDetailBox.propTypes = {
  editMode: PropTypes.bool.isRequired,
  tag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
export default TagDetailBox;
