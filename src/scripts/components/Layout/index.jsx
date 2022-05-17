import { Outlet } from 'react-router-dom';

// MUI Components
import Container from '@mui/material/Container';

// Global Components
import NavBar from '../NavBar';
import Footer from '../Footer';

const Layout = () => (
  <>
    <NavBar />

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

export default Layout;
