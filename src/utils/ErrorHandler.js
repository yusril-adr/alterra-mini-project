// Exceptions
import ClientError from '../exceptions/ClientError';

// Configuration
import CONFIG from '../global/CONFIG';

const ErrorHandler = {
  alert(error, setErrorMessage) {
    if (error instanceof ClientError) {
      setErrorMessage(error.message);
      return;
    }

    // eslint-disable-next-line no-console
    console.log(error);
    setErrorMessage(CONFIG.DEFAULT_ERROR_MESSAGE);
  },
};

export default ErrorHandler;
