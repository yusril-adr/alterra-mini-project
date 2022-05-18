import { useEffect } from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Global Component
import Layout from './components/Layout';
import ProtectedRoutes from './components/ProtectedRoutes';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignOut from './pages/SignOut';
import List from './pages/List';
import TransactionDetail from './pages/TransactionDetail';

// Redux Action
import { signInWithId } from './services/redux/user';

const App = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(signInWithId(user.id));
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
