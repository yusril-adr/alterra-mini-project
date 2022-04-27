import { useEffect } from 'react';
import {
  Navigate,
} from 'react-router-dom';

// Utils
import UserHelper from '../../utils/UserHelper';

const SignOut = () => {
  useEffect(() => {
    UserHelper.signOutUser();
  });

  return (<Navigate to="/" replace />);
};

export default SignOut;
