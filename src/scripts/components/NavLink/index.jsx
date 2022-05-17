import PropTypes from 'prop-types';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';

const NavLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      {...props}
      replace={match}
    >
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  children: PropTypes.element,
  to: PropTypes.string.isRequired,
};

export default NavLink;
