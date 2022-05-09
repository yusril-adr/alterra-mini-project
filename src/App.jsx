import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

// Global Component
import Layout from './components/Layout';

// Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignOut from './pages/SignOut';
import List from './pages/List';
import TransactionDetail from './pages/TransactionDetail';

const App = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={user ? <List /> : <Navigate to="/sign-in" replace />} />

        {user && (
          <>
            <Route path="transaction">
              <Route index element={<Navigate to="/" replace />} />
              <Route path=":transactionId" element={<TransactionDetail />} />
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
