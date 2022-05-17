import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoutes = ({ redirectPath, allowedBy }) => {
  if (!allowedBy) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

ProtectedRoutes.propTypes = {
  redirectPath: PropTypes.string,
  allowedBy: PropTypes.any,
};

ProtectedRoutes.defaultProps = {
  redirectPath: '/',
  allowedBy: true,
};

export default ProtectedRoutes;
