import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import Tag from './Tag';
import { DeepMemo, getFirstItemFromJSON } from '../../utlities/generalUtilities';
import {
  ALL_TAGS_ACTION,
  EDIT_TAG_ACTION,
  ALERT_DIALOG_ACTION,
  ADD_TAG_ACTION, INACTIVE_TAG_ACTION,
} from '../../../redux/constants';
import { doGraphQLMutation, doGraphQLQuery, isAccessLevelEnough, USER_ACTIONS } from '../../../API/utility';
import { UPDATE_TAG, ADD_TAGS } from '../../../API/mutations';
import { ALL_TAGS } from '../../../API/queries';
import EditContent from '../Contents/EditContent';

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
    margin: (theme) => theme.spacing(1, 2, 0, 2),
    textAlign: 'initial ',
    fontWeight: 500,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  tag: {},
  tagParent: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: (theme) => theme.spacing(1, 2, 1, 2),
  },
  editSectionTag: {
    width: '20ch',
  },
  editSectionDescription: {
    margin: (theme) => theme.spacing(3, 1, 1, 1),
    width: '30ch',
  },
};

const TagDetailBox = DeepMemo(function TagDetailBox(props) {
  const dispatch = useDispatch();
  const { tag, count, description, operationMode, id } = props;
  const [onClose, setOnClose] = React.useState(false);
  const [newTag, setNewTag] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');
  const [isAccessEnough, setIsAccessEnough] = React.useState(false);
  useEffect(() => {
    const getUserId = async () => {
      const isEnough = await isAccessLevelEnough(USER_ACTIONS.EDIT_TAG);
      setIsAccessEnough(isEnough);
    };
    getUserId();
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

    if (operationMode === 'editMode') {
      dispatch({ type: EDIT_TAG_ACTION, payload: { operationMode: 'editMode', id } });
    } else {
      dispatch({
        type: ADD_TAG_ACTION,
        payload: { id, title: newTag, content: newDescription, operationMode: 'addMode' },
      });
    }

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
      console.log('operationMode editMode:', operationMode);
      dispatch({ type: EDIT_TAG_ACTION, payload: { operationMode: 'none', id } });
    } else {
      dispatch({ type: ADD_TAG_ACTION, payload: { operationMode: 'none', id } });
      console.log('operationMode addMode:', operationMode);
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
  const handleInactive = async () => {
    dispatch({ type: INACTIVE_TAG_ACTION, payload: { operationMode: 'inactiveMode', id } });
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
              <Box sx={styles.tagParent}>
                <Button aria-label="check" onClick={handleSubmit}>
                  <CheckIcon />
                </Button>
                <Button aria-label="close" onClick={handleCancel}>
                  <CloseIcon />
                </Button>
              </Box>
            )}
          </Box>
          <TextField
            sx={styles.editSectionDescription}
            id="outlined-multiline-static"
            label="Enter Description"
            multiline
            rows={4}
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
              <Box sx={styles.tagParent}>
                <Button aria-label="edit" onClick={handleEdit} tag={tag}>
                  <EditIcon />
                </Button>
                <Button aria-label="delete" onClick={handleInactive}>
                  <DeleteIcon />
                </Button>
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
