import { useLocation } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  const location = useLocation();

  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: {
          xs: location.pathname === '/' ? '2rem 0 5rem 0' : '2rem 0',
          sm: '2rem 0',
        },
      }}
    >
      <Typography>
        © Yusril A. P. {year} All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
