import { useState } from 'react';
import moment from 'moment';

// Package Components
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Configuration
import CONFIG from '../../../../global/CONFIG';

// Exceptions
// import ClientError from '../../../exceptions/ClientError';

const defaultInputsValue = {
  title: '',
  credit: 0,
  date: moment().format('YYYY-MM-DD'),
  type: 'Income',
};

const AddTransaction = () => {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [inputsValue, setInputsValue] = useState(defaultInputsValue);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const onChangeHandler = (event) => {
    const key = event.target.name;

    const newInputsValue = { ...inputsValue };
    newInputsValue[key] = event.target.value;

    setInputsValue(newInputsValue);
  };

  const submitDialog = () => {
    try {
      setInputsValue(defaultInputsValue);
      setAlertMessage(null);
      toggleDialog();
    } catch (error) {
      // if (error instanceof ClientError) {
      //   setAlertMessage(error.message);
      //   return;
      // }

      // eslint-disable-next-line no-console
      console.log(error);
      setAlertMessage(CONFIG.DEFAULT_ERROR_MESSAGE);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex', justifyContent: 'end', alignItems: 'end', height: '100%',
        }}
      >
        <Fab color="primary" aria-label="add" onClick={toggleDialog}>
          <AddIcon />
        </Fab>
      </Container>

      <Dialog open={open} onClose={toggleDialog}>
        <DialogTitle>New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            inputProps={{ maxlength: CONFIG.TRANSACTION_TITLE_MAX_LENGTH }}
            value={inputsValue.title}
            onChange={onChangeHandler}
          />

          <TextField
            required
            margin="dense"
            id="credit"
            label="Credit"
            name="credit"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{
              min: CONFIG.TRANSACTION_CREDIT_MIN,
              max: CONFIG.TRANSACTION_CREDIT_MAX,
            }}
            value={inputsValue.credit}
            onChange={onChangeHandler}
          />

          <TextField
            required
            margin="dense"
            id="date"
            label="Date"
            name="date"
            type="date"
            fullWidth
            variant="standard"
            value={inputsValue.date}
            onChange={onChangeHandler}
          />

          <FormControl fullWidth sx={{ marginTop: '1rem' }}>
            <InputLabel id="transaction-type">Type</InputLabel>
            <Select
              required
              labelId="transaction-type"
              id="type"
              label="Type"
              name="type"
              value={inputsValue.type}
              onChange={onChangeHandler}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Outcome">Outcome</MenuItem>
            </Select>
          </FormControl>

          {alertMessage && (
            <DialogContentText>
              <Alert severity="error">{alertMessage}</Alert>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setInputsValue(defaultInputsValue);
              setAlertMessage(null);
              toggleDialog();
            }}
          >
            Cancel
          </Button>
          <Button onClick={submitDialog}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddTransaction;
