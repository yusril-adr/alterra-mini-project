import { configureStore } from '@reduxjs/toolkit';

// Reducers from Slice
import userReducer from './user';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
