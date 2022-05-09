import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Package Components
import Container from '@mui/material/Container';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';

// Global Components
import NavBar from '../NavBar';
import Footer from '../Footer';

const Layout = () => {
  const user = useSelector((state) => state.user.value);

  const navigations = [
    {
      name: 'List',
      path: '/',
      external: false,
      icon: <ListAltIcon />,
    },
    {
      name: 'About Author',
      path: 'https://yusril-adr.github.io',
      external: true,
      icon: <InfoIcon />,
    },
    {
      name: 'Sign Out',
      path: '/sign-out',
      external: false,
      icon: <LogoutIcon />,
    },
  ];

  return (
    <>
      <NavBar navigationList={navigations} showNavigations={!!user} />

      <Container
        component="main"
        maxWidth="md"
        sx={{
          minHeight: {
            xs: 'calc(100vh - 160px)',
            sm: 'calc(100vh - 176px)',
          },
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </>
  );
};

export default Layout;
