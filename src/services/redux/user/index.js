/* eslint-disable no-param-reassign */
import Swal from 'sweetalert2';
import { createSlice } from '@reduxjs/toolkit';

// Services
import client from '../../apollo/client';

// Apollo Queries
import UserQuery from '../../apollo/users/Query';

// Utils
import UserHelper from '../../../utils/UserHelper';
import AuthenticationError from '../../../errors/AuthenticationError';

const getInitialValue = () => {
  try {
    return UserHelper.getUserDataFromToken() || null;
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

      state.value = UserHelper.getUserDataFromToken();
    },
    signOut: (state) => {
      UserHelper.signOutUser();

      state.value = null;
    },
    tokenSignIn: (state, { payload: user }) => {
      state.value = user;
    },
  },
});

export const {
  signIn, signOut, tokenSignIn,
} = userSlice.actions;

export const signInWithId = (id) => async (dispatch) => {
  const { data: { result } } = await client.query({
    query: UserQuery.GetUserById,
    variables: { id },
  });

  if (!result) {
    throw new AuthenticationError('Current User didn\'t exist anymore.');
  }

  dispatch(tokenSignIn(result));
};

export default userSlice.reducer;
