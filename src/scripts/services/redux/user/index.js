/* eslint-disable no-param-reassign */
import Swal from 'sweetalert2';
import { createSlice } from '@reduxjs/toolkit';

// Utils
import UserHelper from '../../../utils/UserHelper';
import AuthenticationError from '../../../errors/AuthenticationError';

const getInitialValue = () => {
  try {
    return UserHelper.getSignInUser() || null;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      Swal.fire(
        'Oops...',
        error.message,
        'error',
      );
      UserHelper.signOutUser();
    }

    return null;
  }
};

const initialState = {
  value: getInitialValue(),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, { payload: { inputtedUser, user } }) => {
      UserHelper.signInUser(inputtedUser, user);

      state.value = UserHelper.getSignInUser();
    },
    signOut: (state) => {
      UserHelper.signOutUser();

      state.value = null;
    },
  },
});

export const {
  signIn, signOut,
} = userSlice.actions;

export default userSlice.reducer;
