const CONFIG = {
  GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL,
  GRAPHQL_WS_URL: process.env.REACT_APP_GRAPHQL_WS_URL,
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY,
  TRANSACTION_TITLE_MAX_LENGTH: 12,
  TRANSACTION_CREDIT_MIN: 1,
  TRANSACTION_CREDIT_MAX: 99999999, // 99 Millions
  DEFAULT_ERROR_MESSAGE: 'Something went wrong.',
  USER_PASSWORD_MIN_LENGTH: 8,
  DEFAULT_TOKEN_EXPIRED: 1000 * 60 * 60 * 24 * 7, // 7 Days,
  CACHE_NAME: {
    API: 'wager-lite-v1.0.0-api',
    IMAGE: 'wager-lite-v1.0.0-image',
  },
  OLD_CACHE_NAME: [],
  CACHE_EXP: 1000 * 60 * 60 * 24 * 30, // 30 Days
};

export default CONFIG;
