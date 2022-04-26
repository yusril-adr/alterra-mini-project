import { Outlet } from 'react-router-dom';

// Package Components
import Container from '@mui/material/Container';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

// Global Components
import NavBar from '../NavBar';
import Footer from '../Footer';

const Layout = () => {
  const navigations = [
    {
      name: 'List',
      path: '/',
      external: false,
      icon: <ListAltIcon />,
    },
    {
      name: 'Setting',
      path: '/setting',
      external: false,
      icon: <SettingsIcon />,
    },
    {
      name: 'About Author',
      path: 'https://yusril-adr.github.io',
      external: true,
      icon: <InfoIcon />,
    },
  ];

  return (
    <>
      <NavBar navigationList={navigations} />

      <Container
        component="main"
        maxWidth="md"
        sx={{
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </>
  );
};

export default Layout;
