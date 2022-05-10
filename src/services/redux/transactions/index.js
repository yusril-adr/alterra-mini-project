/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    updateList: (state, { payload: newTransactions }) => {
      state.value = [...newTransactions];
    },
  },
});

export const {
  updateList,
} = transactionSlice.actions;

export default transactionSlice.reducer;
