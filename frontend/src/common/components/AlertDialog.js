import * as React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { ALERT_DIALOG_ACTION } from '../../redux/constants';

export default function AlertDialog({ alertError }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: ALERT_DIALOG_ACTION, payload: { showError: false } });
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{alertError.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{alertError.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
