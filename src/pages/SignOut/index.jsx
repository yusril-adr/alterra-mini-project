import { useDispatch } from 'react-redux';
import {
  Navigate,
} from 'react-router-dom';

// Redux Actions
import { signOut } from '../../services/redux/user';

const SignOut = () => {
  const dispatch = useDispatch();

  dispatch(signOut());

  return (<Navigate to="/" replace />);
};

export default SignOut;
