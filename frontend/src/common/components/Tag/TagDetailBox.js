import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Tag from './Tag';
import { DeepMemo } from '../../utlities/generalUtilities';
import { EDIT_TAG } from '../../../redux/constants';

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
  icons: {},
  closeButton: {},
};

const TagDetailBox = DeepMemo(function TagDetailBox(props) {
  const dispatch = useDispatch();
  const { tag, count, description, isTagEditMode, id } = props;
  const [onClose, setOnClose] = React.useState(false);
  const [value, setValue] = React.useState('');
  const handleEditFinished = () => {
    dispatch({ type: EDIT_TAG, payload: { isTagEditMode: true } });
    setOnClose(true);
    return <Tag sx={styles.tag} tag={value} count={count} />;
  };

  const handleTagChange = (event) => {
    setValue(event.target.value);
  };
  const handleEdit = (props) => {
    setValue(tag);
    dispatch({ type: EDIT_TAG, payload: { isTagEditMode: true, id } });
    setOnClose(false);
  };
  return (
    <Box boxShadow={2} sx={styles.root}>
      {isTagEditMode ? (
        <Box>
          <Box sx={styles.tagParent}>
            <TextField
              id="outlined-basic"
              label="Enter Tag"
              variant="outlined"
              size="small"
              sx={styles.editSectionTag}
              value={value}
              onChange={handleTagChange}
            />
            {!onClose && (
              <Box sx={styles.tagParent}>
                <Button aria-label="check" sx={styles.closeButton} onClick={handleEditFinished}>
                  <CheckIcon />
                </Button>
                <Button aria-label="close" sx={styles.closeButton} onClick={handleEditFinished}>
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
            variant="outlined"
          />
        </Box>
      ) : (
        <Box>
          <Box sx={styles.tagParent}>
            <Tag sx={styles.tag} tag={tag} count={count} />
            <Button aria-label="edit" sx={styles.closeButton} onClick={handleEdit} tag={tag}>
              <EditIcon />
            </Button>
          </Box>
          <Typography sx={styles.description}>{description}</Typography>
        </Box>
      )}
    </Box>
  );
});
TagDetailBox.propTypes = {
  tag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
export default TagDetailBox;
