import React from 'react';
import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

const styles = {
  root: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: (theme) => theme.spacing(4),
    paddingBottom: (theme) => theme.spacing(4),
  },
  button: {
    padding: (theme) => theme.spacing(1, 6, 1, 6),
    marginRight: (theme) => theme.spacing(3),
  },
  error: {
    marginTop: (theme) => theme.spacing(2),
    marginBottom: (theme) => theme.spacing(3),
  },
};

const SaveCancelButtons = ({ onSave, onCancel, error }) => {
  return (
    <Box>
      <Box sx={styles.root}>
        <Button onClick={onSave} variant="contained" color="primary" sx={styles.button}>
          {'ذخیره'}
        </Button>
        <Button onClick={onCancel} variant="contained" color="secondary" sx={styles.button}>
          {'لغو'}
        </Button>
      </Box>
      {error && <ErrorMessage sx={styles.error} text={error} />}
    </Box>
  );
};
SaveCancelButtons.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  clas: PropTypes.object,
  error: PropTypes.string,
};
export default SaveCancelButtons;
