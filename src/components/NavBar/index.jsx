import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Package Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// MUI Icons
import ListAltIcon from '@mui/icons-material/ListAlt';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

// MUI Color
import { blue, grey } from '@mui/material/colors';

// Assets
import styles from './style.module.css';
import logo from '../../images/logo.png';

// Global Components
import NavLink from '../NavLink';

// Utils
import TransactionHelper from '../../utils/TransactionHelper';
import ErrorHandler from '../../utils/ErrorHandler';

const NavBar = ({ title }) => {
  const [open, setOpen] = useState(false);

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
      name: 'Download CSV',
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

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(!open);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'primary' }}>
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Box sx={{ display: user ? 'flex' : 'none', mr: '1rem' }}>
              <IconButton
                size="large"
                aria-label="Toggle Menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

            </Box>
            <Typography
              variant="h5"
              noWrap
              component="h1"
              sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'start', md: 'center' } }}
            >
              {title}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Box
            sx={{
              backgroundColor: blue[700],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingY: '2rem',
            }}
          >
            <img data-src={logo} alt="logo" className={`lazyload ${styles.logo_image}`} />
          </Box>

          <List>
            {navigations.map(({
              name, path, icon, external, custom, onClick,
            }) => (
              <li key={name}>
                {external && !custom && (
                <a href={path} target="_blank" rel="noopener noreferrer">
                  <ListItem button>
                    <ListItemIcon>
                      {icon}
                    </ListItemIcon>

                    <ListItemText primary={name} sx={{ color: grey[600] }} />
                  </ListItem>
                </a>
                )}

                {!external && !custom && (
                <NavLink to={path} key={name}>
                  <ListItem button>
                    <ListItemIcon>
                      {icon}
                    </ListItemIcon>

                    <ListItemText primary={name} sx={{ color: grey[600] }} />
                  </ListItem>
                </NavLink>
                )}

                {custom && (
                  <ListItem as="button" button onClick={onClick} key={name} sx={{ border: 'inherit', background: 'inherit' }}>
                    <ListItemIcon>
                      {icon}
                    </ListItemIcon>

                    <ListItemText primary={name} sx={{ color: grey[600] }} />
                  </ListItem>
                )}
              </li>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

NavBar.propTypes = {
  title: PropTypes.string,
};

NavBar.defaultProps = {
  title: 'Wager',
};

export default NavBar;
