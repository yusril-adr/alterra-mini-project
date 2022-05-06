import { encode } from 'js-base64';

// Errors
import AuthenticationError from '../errors/AuthenticationError';
import CONFIG from '../global/CONFIG';

// Services
import localStorageService from '../services/localStorage';

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

    localStorageService.setItem(CONFIG.TOKEN_KEY, token);
  },

  getSignInUser() {
    const token = localStorageService.getItem(CONFIG.TOKEN_KEY);

    if (!token) {
      return null;
    }

    const user = TokenManager.verifyToken(token);
    return user;
  },

  signOutUser() {
    localStorageService.removeItem(CONFIG.TOKEN_KEY);
  },
};

export default UserHelper;
