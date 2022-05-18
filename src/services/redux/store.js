import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers from Slice
import userReducer from './user';
import transactionReducer from './transactions';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
  },
}, composedEnhancer);

export default store;
