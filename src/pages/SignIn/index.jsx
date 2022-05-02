import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

// MUI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

// MUI Colors
import { blue } from '@mui/material/colors';

// MUI Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Global Components
import Alert from '../../components/Alert';
import Loading from '../../components/Loading';

// GraphQL Queries
import { Query } from '../../services/apollo/users';

// Utils
import UserHelper from '../../utils/UserHelper';
import AuthenticationError from '../../exceptions/AuthenticationError';
import ErrorHandler from '../../utils/ErrorHandler';

const defaultInputsValue = {
  username: '',
  password: '',
};

const SignIn = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [inputsValue, setInputsValue] = useState(defaultInputsValue);

  const navigate = useNavigate();

  const [getUserByUsername, { loading: signInLoading }] = useLazyQuery(Query.GetUserByUsername, {
    onCompleted: async ({ result }) => {
      try {
        const [user] = result;
        if (!user) throw new AuthenticationError('Username didn\'t exist.');

        UserHelper.signInUser(inputsValue, user);

        navigate('/', { replace: true });
        setInputsValue(defaultInputsValue);
        setAlertMessage(null);
      } catch (error) {
        ErrorHandler.alert(error, setAlertMessage);
      }
    },
    onError: (error) => {
      ErrorHandler.alert(error, setAlertMessage);
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChangeHandler = (event) => {
    const key = event.target.name;

    const newInputsValue = { ...inputsValue };
    newInputsValue[key] = event.target.value;

    setInputsValue(newInputsValue);
  };

  const submitHandler = (event) => {
    try {
      event.preventDefault();
      const variables = UserHelper.secureUser(inputsValue);
      getUserByUsername({ variables });
    } catch (error) {
      ErrorHandler.alert(error, setAlertMessage);
    }
  };

  const onCloseHandler = () => {
    setAlertMessage(null);
  };

  if (signInLoading) {
    return (<Loading title="Signing in user ..." />);
  }

  return (
    <Box
      sx={{
        maxWidth: 450,
        minHeight: {
          xs: 'calc(100vh - 160px)',
          sm: 'calc(100vh - 176px)',
        },
        margin: 'auto',
        mt: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box component="form" sx={{ width: '100%' }} onSubmit={submitHandler}>
        <Card>
          <CardContent sx={{ p: '1.5rem' }}>
            <Typography variant="h4" element="h2" textAlign="center">
              Sign In
            </Typography>
          </CardContent>

          <CardContent sx={{ pt: 0 }}>
            <TextField
              autoFocus
              required
              autoComplete="off"
              margin="dense"
              id="username"
              label="Username"
              name="username"
              type="text"
              fullWidth
              variant="outlined"
              value={inputsValue.username}
              onChange={onChangeHandler}
            />

            <FormControl sx={{ width: '100%', mt: '1rem' }}>
              <InputLabel htmlFor="password">Password *</InputLabel>
              <OutlinedInput
                required
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={inputsValue.password}
                onChange={onChangeHandler}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
                label="Password"
              />
            </FormControl>
          </CardContent>

          <CardActions sx={{ pb: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">Sign In</Button>
          </CardActions>
        </Card>
      </Box>

      <Box sx={{ marginTop: '1rem', width: '100%' }}>
        <Card>
          <CardContent>
            <Typography textAlign="center">
              {'Don\'t have account? '}
              <Link
                to="/sign-up"
                component={RouterLink}
                sx={{
                  textDecoration: 'none',
                  ':hover': {
                    color: blue.A400,
                  },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Alert title="Error Occured !" message={alertMessage || ''} openTrigger={!!alertMessage} onCloseHandler={onCloseHandler} />
    </Box>
  );
};

export default SignIn;
