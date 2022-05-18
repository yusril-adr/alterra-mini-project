import { configureStore } from '@reduxjs/toolkit';

// Reducers from Slice
import userReducer from './user';
import transactionReducer from './transactions';

const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
  },
});

export default store;
