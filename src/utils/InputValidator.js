// Exceptions
import InvariantError from '../exceptions/InvariantError';

// Configuration
import CONFIG from '../global/CONFIG';

// Utils
import MoneyFormatter from './MoneyFormatter';

const InputValidator = {
  validateSignUp: ({ username, password, confirmPassword }) => {
    if (username.trim().includes(' ')) throw new InvariantError('Username should not contain any spaces');

    if (password.length > CONFIG.USER_PASSWORD_MIN_LENGTH) throw new InvariantError(`Password length Minimum is ${CONFIG.USER_PASSWORD_MIN_LENGTH}`);

    if (password !== confirmPassword) throw new InvariantError('Confirm password is not valid.');
  },

  validateTransaction: ({ credit }) => {
    if (credit > CONFIG.TRANSACTION_CREDIT_MAX) {
      throw new InvariantError(`Sorry but the limit of credit max is ${MoneyFormatter.format(CONFIG.TRANSACTION_CREDIT_MAX)}`);
    }

    if (credit < CONFIG.TRANSACTION_CREDIT_MIN) {
      throw new InvariantError(`Sorry but the minimum of credit is ${MoneyFormatter.format(CONFIG.TRANSACTION_CREDIT_MIN)}`);
    }
  },
};

export default InputValidator;
