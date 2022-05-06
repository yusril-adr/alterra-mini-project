import { useState, useEffect } from 'react';
import {
  useLocation, Routes, Route, Navigate,
} from 'react-router-dom';

// Global Component
import Layout from './components/Layout';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignOut from './pages/SignOut';
import List from './pages/List';
import TransactionDetail from './pages/TransactionDetail';

// Utils
import UserHelper from './utils/UserHelper';

const App = () => {
  const [user, setUser] = useState(UserHelper.getSignInUser());
  const location = useLocation();

  useEffect(() => {
    try {
      const signInUser = UserHelper.getSignInUser();
      setUser(signInUser);
    } catch (error) {
      setUser(null);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} />}>
        <Route index element={user ? <List user={user} /> : <Navigate to="/sign-in" replace />} />

        {user && (
          <>
            <Route path="transaction">
              <Route index element={<Navigate to="/" replace />} />
              <Route path=":transactionId" element={<TransactionDetail user={user} />} />
            </Route>

            <Route path="sign-out" element={<SignOut />} />
          </>
        )}

        {!user && (
          <>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
