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
      username: formattedUsername,
      password: encodedPassword,
      ...payload,
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

  _initToken({ password, ...userData }) {
    const token = TokenManager.createToken(userData);

    localStorageService.setItem(CONFIG.TOKEN_KEY, token);
  },

  getUserDataFromToken() {
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
