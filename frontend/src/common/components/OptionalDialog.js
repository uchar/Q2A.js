import React from 'react';
import { Button, Box } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { ALERT_OPTIONAL_DIALOG_ACTION } from '../../redux/constants';

export default function OptionalDialog({ optionalDialog }) {
  const handleClose = () => {
    const dispatch = useDispatch();
    dispatch({ type: ALERT_OPTIONAL_DIALOG_ACTION, payload: { showError: false } });
  };

  return (
    <Box>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{optionalDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{optionalDialog.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
