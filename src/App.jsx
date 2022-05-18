import { useEffect } from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

// Global Component
import Layout from './components/Layout';
import ProtectedRoutes from './components/ProtectedRoutes';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignOut from './pages/SignOut';
import List from './pages/List';
import TransactionDetail from './pages/TransactionDetail';

// Apollo Queries
import UserQuery from './services/apollo/users/Query';

// Exceptions
import AuthenticationError from './errors/AuthenticationError';

// Redux Action
import { tokenSignIn } from './services/redux/user';

// Utils
import ErrorHandler from './utils/ErrorHandler';

const App = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [signInUserById] = useLazyQuery(UserQuery.GetUserById, {
    onCompleted: ({ result }) => {
      try {
        if (!result) throw new AuthenticationError('Current User didn\'t exist anymore.');

        dispatch(tokenSignIn(result));
      } catch (error) {
        ErrorHandler.swal(error);
        dispatch(tokenSignIn(null));
      }
    },
    onError: (error) => {
      ErrorHandler.swal(error);
      dispatch(tokenSignIn(null));
    },
  });

  useEffect(() => {
    if (user) {
      signInUserById({ variables: { id: user.id } });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route element={<ProtectedRoutes redirectPath="/sign-in" allowedBy={user} />}>
          <Route index element={<List />} />

          <Route path="transaction">
            <Route index element={<Navigate to="/" replace />} />
            <Route path=":transactionId" element={<TransactionDetail />} />
          </Route>

          <Route path="sign-out" element={<SignOut />} />
        </Route>

        <Route element={<ProtectedRoutes redirectPath="/" allowedBy={!user} />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
