import { useState } from 'react';
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

// MUI Color
import { blue, grey } from '@mui/material/colors';

// Global Components
import logo from '../../../images/loading.svg';
import NavLink from '../NavLink';

const NavBar = ({ title, navigationList }) => {
  const [open, setOpen] = useState(false);

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
            <Box sx={{ display: 'flex', mr: '1rem' }}>
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
            sx={{ backgroundColor: blue[700] }}
          >
            <img src={logo} alt="logo" />
          </Box>

          <List>
            {navigationList.map(({
              name, path, icon, external,
            }) => (
              <li key={path}>
                {external && (
                <a href={path} key={path} target="_blank" rel="noopener noreferrer">
                  <ListItem button key={path}>
                    <ListItemIcon>
                      {icon}
                    </ListItemIcon>

                    <ListItemText primary={name} sx={{ color: grey[600] }} />
                  </ListItem>
                </a>
                )}

                {!external && (
                <NavLink to={path} key={path}>
                  <ListItem button key={path}>
                    <ListItemIcon>
                      {icon}
                    </ListItemIcon>

                    <ListItemText primary={name} sx={{ color: grey[600] }} />
                  </ListItem>
                </NavLink>
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
  navigationList: PropTypes.array.isRequired,
};

NavBar.defaultProps = {
  title: 'Wager',
};

export default NavBar;
