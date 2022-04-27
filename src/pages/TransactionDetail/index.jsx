import { useState } from 'react';
import moment from 'moment';

// MUI Components
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
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

// Global Components
import Alert from '../../components/Alert';

// Configuration
import CONFIG from '../../global/CONFIG';

const defaultInputsValue = {
  title: '',
  credit: 0,
  date: moment().format('YYYY-MM-DD'),
  type: 'Income',
};

const TransactionDetail = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [inputsValue, setInputsValue] = useState(defaultInputsValue);

  const onChangeHandler = (event) => {
    const key = event.target.name;

    const newInputsValue = { ...inputsValue };
    newInputsValue[key] = event.target.value;

    setInputsValue(newInputsValue);
  };

  const submitHandler = (event) => {
    try {
      event.preventDefault();
      setInputsValue(defaultInputsValue);
      setAlertMessage(null);
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

  const onCloseHandler = () => {
    setAlertMessage(null);
  };

  return (
    <Box
      sx={{ mt: '1.5rem' }}
    >
      <form onSubmit={submitHandler}>
        <Card>
          <CardContent sx={{ pt: '.5rem', pb: 0 }}>
            <Typography variant="h4" element="h2" textAlign="center">
              Edit
            </Typography>

            <Divider sx={{ mt: '.5rem' }} />
          </CardContent>

          <CardContent sx={{ pt: 0 }}>
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
              inputProps={{ maxLength: CONFIG.TRANSACTION_TITLE_MAX_LENGTH }}
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

            <Alert title="Oopss ..." message={alertMessage || ''} openTrigger={!!alertMessage} onCloseHandler={onCloseHandler} />
          </CardContent>

          <CardActions sx={{ pb: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Button type="button" variant="contained" color="error" sx={{ marginRight: '1rem' }}>Delete</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default TransactionDetail;
