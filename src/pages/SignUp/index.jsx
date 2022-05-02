import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

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
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';

// GraphQL Queries
import { Mutation } from '../../services/apollo/users';

// Configuration
import CONFIG from '../../global/CONFIG';

// Utils
import InputValidator from '../../utils/InputValidator';
import UserHelper from '../../utils/UserHelper';
import ErrorHandler from '../../utils/ErrorHandler';

const defaultInputsValue = {
  username: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputsValue, setInputsValue] = useState(defaultInputsValue);

  const navigate = useNavigate();

  const [createUser, { loading: createUserLoading }] = useMutation(Mutation.CreateUser, {
    onCompleted: async ({ result }) => {
      await Swal.fire('Success', `Please sign in with ${result.username} !`, 'success');
      navigate('/sign-in');
      setInputsValue(defaultInputsValue);
      setAlertMessage(null);
    },
    onError: (error) => {
      if (error.message.startsWith('Uniqueness violation.')) {
        return setAlertMessage('Username already exist.');
      }

      return ErrorHandler.alert(error, setAlertMessage);
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

      InputValidator.validateSignUp(inputsValue);

      const variables = UserHelper.secureUser(inputsValue);

      createUser({ variables });
    } catch (error) {
      ErrorHandler.alert(error, setAlertMessage);
    }
  };

  if (createUserLoading) {
    return (<Loading title="Signing up user ..." />);
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
              Sign Up
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
                autoComplete="off"
                type={showPassword ? 'text' : 'password'}
                value={inputsValue.password}
                onChange={onChangeHandler}
                inputProps={{ minLength: CONFIG.USER_PASSWORD_MIN_LENGTH }}
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
                label="Password *"
              />
            </FormControl>

            <FormControl sx={{ width: '100%', mt: '1rem' }}>
              <InputLabel htmlFor="confirm_password">Confirm Password *</InputLabel>
              <OutlinedInput
                required
                id="confirm_password"
                name="confirmPassword"
                autoComplete="off"
                type={showConfirmPassword ? 'text' : 'password'}
                value={inputsValue.confirmPassword}
                onChange={onChangeHandler}
                inputProps={{ minLength: CONFIG.USER_PASSWORD_MIN_LENGTH }}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
                label="Confirm Password *"
              />
            </FormControl>
          </CardContent>

          <CardActions sx={{ pb: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">Sign Up</Button>
          </CardActions>
        </Card>
      </Box>

      <Box sx={{ marginTop: '1rem', width: '100%' }}>
        <Card>
          <CardContent>
            <Typography textAlign="center">
              {'Have an account ? '}
              <Link
                to="/sign-in"
                component={RouterLink}
                sx={{
                  textDecoration: 'none',
                  ':hover': {
                    color: blue.A400,
                  },
                }}
              >
                Sign In
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Alert title="Error Occured !" message={alertMessage || ''} openTrigger={!!alertMessage} onCloseHandler={onCloseHandler} />
    </Box>
  );
};

export default SignUp;
