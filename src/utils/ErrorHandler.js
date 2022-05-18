// Package
import Swal from 'sweetalert2';

// Errors
import ClientError from '../errors/ClientError';

// Configuration
import CONFIG from '../global/CONFIG';

const ErrorHandler = {
  alert(error, setErrorMessage) {
    let message = CONFIG.DEFAULT_ERROR_MESSAGE;
    if (error instanceof ClientError) {
      message = error.message;
      return;
    }

    // eslint-disable-next-line no-console
    console.log(error);
    setErrorMessage(message);
  },

  swal(error) {
    let message = CONFIG.DEFAULT_ERROR_MESSAGE;
    if (error instanceof ClientError) {
      message = error.message;
    }

    // eslint-disable-next-line no-console
    console.log(error);
    Swal.fire(
      'Oops...',
      message,
      'error',
    );
  },
};

export default ErrorHandler;
