// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: {
          xs: '2rem 0 5rem 0',
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
