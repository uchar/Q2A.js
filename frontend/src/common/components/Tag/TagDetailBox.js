import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import Tag from './Tag';
import { DeepMemo } from '../../utlities/generalUtilities';

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
  },
  icons: {
    margin: (theme) => theme.spacing(1, 2, 0, 2),
  },
};

const TagDetailBox = DeepMemo(function TagDetailBox(props) {
  const { tag, count, description } = props;
  const [isEditMode, setIsEditMode] = React.useState(false);
  return (
    <Box boxShadow={2} sx={styles.root}>
      <Box sx={styles.tagParent}>
        {!isEditMode ? (
          <Box>
            <TextField
              id="outlined-basic"
              label="Enter Tag"
              variant="outlined"
              size="small"
              sx={styles.editSectionTag}
            />
            <CheckIcon sx={styles.icons} />
            <CloseIcon sx={styles.icons} />
          </Box>
        ) : (
          <Box>
            <Tag sx={styles.tag} tag={tag} count={count} />
            <EditIcon />
          </Box>
        )}
      </Box>
      {!isEditMode ? (
        <TextField
          sx={styles.editSectionDescription}
          id="outlined-multiline-static"
          label="Enter Description"
          multiline
          rows={4}
          variant="outlined"
        />
      ) : (
        <Typography sx={styles.description}>{description}</Typography>
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
