import { encode, decode } from 'js-base64';

// Errors
import AuthenticationError from '../errors/AuthenticationError';

// Configuration
import CONFIG from '../global/CONFIG';

const TokenManager = {
  createToken(objectParam) {
    const objectJson = JSON.stringify({
      ...objectParam,
      expired: +new Date() + CONFIG.DEFAULT_TOKEN_EXPIRED,
    });
    const result = encode(objectJson);
    return result;
  },

  verifyToken(token) {
    const decoded = decode(token);
    const result = JSON.parse(decoded);
    if (result.expired < +new Date()) throw new AuthenticationError('Session is Expired.');
    delete result.expired;
    return result;
  },
};

export default TokenManager;
