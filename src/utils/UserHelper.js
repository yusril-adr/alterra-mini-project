import { encode } from 'js-base64';

// Exceptions
import AuthenticationError from '../exceptions/AuthenticationError';
import CONFIG from '../global/CONFIG';

// Utils
import TokenManager from './TokenManager';

const UserHelper = {
  secureUser({ username, password, ...payload }) {
    const formattedUsername = username.trim().toLowerCase();
    const encodedPassword = encode(password);

    return {
      ...payload,
      username: formattedUsername,
      password: encodedPassword,
    };
  },

  signInUser(payload, user) {
    const formattedPayload = this.secureUser(payload);

    this._validatePassword(formattedPayload, user);
    this._initToken(user);
  },

  _validatePassword(payload, user) {
    if (payload.password !== user.password) {
      throw new AuthenticationError('Password Invalid');
    }
  },

  _initToken({ id, username }) {
    const token = TokenManager.createToken({ id, username });

    window.localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, token);
  },

  getSignInUser() {
    const token = window.localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);

    const user = TokenManager.verifyToken(token);
    return user;
  },

  signOutUser() {
    window.localStorage.removeItem(CONFIG.LOCAL_STORAGE_KEY);
  },
};

export default UserHelper;
