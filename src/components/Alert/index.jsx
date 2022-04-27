import PropTypes from 'prop-types';

// MUI Components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const Alert = ({
  title, message, openTrigger, onCloseHandler,
}) => (
  <Dialog
    open={openTrigger}
    onClose={onCloseHandler}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCloseHandler} autoFocus>
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  openTrigger: PropTypes.any.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  title: 'Alert',
};

export default Alert;
