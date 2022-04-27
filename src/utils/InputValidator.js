import InvariantError from '../exceptions/InvariantError';
import CONFIG from '../global/CONFIG';

const InputValidator = {
  validateSignUp: ({ username, password, confirmPassword }) => {
    if (username.trim().includes(' ')) throw new InvariantError('Username should not contain any spaces');

    if (password.length > CONFIG.USER_PASSWORD_MIN_LENGTH) throw new InvariantError(`Password length Minimum is ${CONFIG.USER_PASSWORD_MIN_LENGTH}`);

    if (password !== confirmPassword) throw new InvariantError('Confirm password is not valid.');
  },
};

export default InputValidator;
