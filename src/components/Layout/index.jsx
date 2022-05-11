import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Package Components
import Container from '@mui/material/Container';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

// Global Components
import NavBar from '../NavBar';
import Footer from '../Footer';

// Utils
import TransactionHelper from '../../utils/TransactionHelper';
import ErrorHandler from '../../utils/ErrorHandler';

const Layout = () => {
  const user = useSelector((state) => state.user.value);
  const transactions = useSelector((state) => state.transactions.value);

  const navigations = [
    {
      name: 'List',
      path: '/',
      external: false,
      icon: <ListAltIcon />,
    },
    {
      name: 'Downlad Transactions',
      external: false,
      icon: <SimCardDownloadOutlinedIcon />,
      custom: true,
      onClick: () => {
        try {
          TransactionHelper.downloadCSV(transactions);
        } catch (error) {
          ErrorHandler.swal(error);
        }
      },
    },
    {
      name: 'About Author',
      path: 'https://yusril-adr.github.io',
      external: true,
      icon: <InfoOutlinedIcon />,
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
