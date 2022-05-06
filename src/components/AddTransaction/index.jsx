import { useState } from 'react';
import { useMutation } from '@apollo/client';
import moment from 'moment';

// Package Components
import NumberFormat from 'react-number-format';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Global Components
import Loading from '../Loading';
import Alert from '../Alert';

// GraphQL Queries
import Mutation from '../../services/apollo/transactions/Mutation';

// Utils
// import UserHelper from '../../utils/UserHelper';
import ErrorHandler from '../../utils/ErrorHandler';
import UserHelper from '../../utils/UserHelper';
import TransactionHelper from '../../utils/TransactionHelper';
import InputValidator from '../../utils/InputValidator';

const defaultInputsValue = {
  title: '',
  credit: '',
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

  const [createTransaction, {
    loading: createTransactionLoading,
  }] = useMutation(Mutation.CreateTransaction, {
    onCompleted: async () => {
      setInputsValue(defaultInputsValue);
      setAlertMessage(null);
      toggleDialog();
    },
    onError: (error) => {
      ErrorHandler.alert(error, setAlertMessage);
    },
  });

  const onChangeHandler = (event) => {
    const key = event.target.name;

    const newInputsValue = { ...inputsValue };
    newInputsValue[key] = event.target.value;

    setInputsValue(newInputsValue);
  };

  const onCloseHandler = () => {
    setAlertMessage(null);
  };

  const submitHandler = (event) => {
    try {
      event.preventDefault();

      const user = UserHelper.getSignInUser();
      const formattedValue = TransactionHelper.formatTransactionValue(inputsValue);
      const variables = { ...formattedValue, userId: user.id };

      InputValidator.validateTransaction(variables);

      createTransaction({ variables });
    } catch (error) {
      ErrorHandler.alert(error, setAlertMessage);
    }
  };

  if (createTransactionLoading) {
    return (<Loading title="Adding new transaction ..." />);
  }

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
        <DialogTitle sx={{ p: '1.5rem' }} align="center">Add Transaction</DialogTitle>

        <form onSubmit={submitHandler}>
          <DialogContent sx={{ pt: 0 }}>
            <TextField
              autoFocus
              required
              autoComplete="off"
              margin="dense"
              id="title"
              label="Title"
              name="title"
              type="text"
              fullWidth
              variant="outlined"
              value={inputsValue.title}
              onChange={onChangeHandler}
            />

            <NumberFormat
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={0}
              autoComplete="off"
              customInput={TextField}
              displayType="number"
              required
              margin="dense"
              id="credit"
              label="Credit"
              name="credit"
              fullWidth
              variant="outlined"
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
              variant="outlined"
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
          </DialogContent>

          <DialogActions>
            <Button
              type="button"
              onClick={() => {
                setInputsValue(defaultInputsValue);
                setAlertMessage(null);
                toggleDialog();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>

      </Dialog>

      <Alert title="Error Occured !" message={alertMessage || ''} openTrigger={!!alertMessage} onCloseHandler={onCloseHandler} />
    </Box>
  );
};

export default AddTransaction;
