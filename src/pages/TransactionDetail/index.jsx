import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import moment from 'moment';

// Package Components
import NumberFormat from 'react-number-format';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// Global Components
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';
import TransactionNotFound from '../../components/TransactionNotFound';

// GraphQL Queries
import { Mutation, Query } from '../../services/apollo/transactions';

// Utils
import ErrorHandler from '../../utils/ErrorHandler';
import TransactionHelper from '../../utils/TransactionHelper';
import InputValidator from '../../utils/InputValidator';
import MoneyFormatter from '../../utils/MoneyFormatter';

const defaultInputsValue = {
  title: '',
  credit: '',
  date: moment().format('YYYY-MM-DD'),
  type: 'Income',
};

const TransactionDetail = () => {
  const user = useSelector((state) => state.user.value);
  const [alertMessage, setAlertMessage] = useState(null);
  const [inputsValue, setInputsValue] = useState(defaultInputsValue);

  const { transactionId } = useParams();
  const navigate = useNavigate();

  const {
    data: { result: transaction } = { result: null },
    loading: getTransactionLoading,
  } = useQuery(Query.GetTransactionById, {
    variables: { id: transactionId },
    onCompleted: async ({ result }) => {
      if (result && result.userId !== user.id) {
        await Swal.fire('Forbidden', `This transaction is not belong to ${user.username}`, 'error');
        return navigate('/');
      }

      const formatedCredit = MoneyFormatter.format(result.credit);

      return setInputsValue({ ...result, credit: formatedCredit });
    },
    onError: (error) => {
      ErrorHandler.alert(error, setAlertMessage);
    },
  });

  const [updateTransactionById, {
    loading: updateTransactionLoading,
  }] = useMutation(Mutation.UpdateTransactionById, {
    onCompleted: async () => {
      await Swal.fire('Success', 'Transaction Updated', 'success');
      setAlertMessage(null);
    },
    onError: (error) => {
      ErrorHandler.alert(error, setAlertMessage);
    },
  });

  const [deleteTransactionById, {
    loading: deleteTransactionLoading,
  }] = useMutation(Mutation.DeleteTransactionById, {
    onCompleted: async () => {
      await Swal.fire('Success', 'Transaction Deleted', 'success');
      setAlertMessage(null);
      navigate('/');
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

      const formattedValue = TransactionHelper.formatTransactionValue(inputsValue);
      const variables = { ...formattedValue, userId: user.id };

      InputValidator.validateTransaction(variables);

      updateTransactionById({ variables });
    } catch (error) {
      ErrorHandler.alert(error, setAlertMessage);
    }
  };

  const deleteHandler = async () => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmation.isConfirmed) {
      const variables = { id: transactionId };
      deleteTransactionById({ variables });
    }
  };

  if (getTransactionLoading) {
    return (<Loading title="Fetching Transaction ..." />);
  }

  if (updateTransactionLoading) {
    return (<Loading title="Updating Transaction ..." />);
  }

  if (deleteTransactionLoading) {
    return (<Loading title="Deleting Transaction ..." />);
  }

  if (!transaction) {
    return (<TransactionNotFound />);
  }

  return (
    <Box
      sx={{ mt: '1.5rem' }}
    >
      <form onSubmit={submitHandler}>
        <Card>
          <CardContent sx={{ p: '1rem' }}>
            <Typography variant="h4" element="h2" textAlign="center">
              Edit
            </Typography>
          </CardContent>

          <CardContent sx={{ pt: 0 }}>
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

            <Alert title="Oopss ..." message={alertMessage || ''} openTrigger={!!alertMessage} onCloseHandler={onCloseHandler} />
          </CardContent>

          <CardActions sx={{ pb: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Button type="button" variant="contained" color="error" sx={{ marginRight: '1rem' }} onClick={deleteHandler}>Delete</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default TransactionDetail;
