import { Link as RouterLink } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const TransactionNotFound = () => (
  <Box
    sx={{
      maxWidth: 450,
      minHeight: {
        xs: 'calc(100vh - 160px)',
        sm: 'calc(100vh - 176px)',
      },
      margin: 'auto',
      mt: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Box sx={{ width: '100%' }}>
      <Card>
        <CardContent>
          <img data-src="/images/logo.png" className="lazyload" alt="404 not Found Illustration" />
        </CardContent>
        <CardContent sx={{ pt: '.5rem', pb: 0 }}>
          <Typography variant="h4" element="h2" textAlign="center">
            Transaction Not Found.
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            mt: '1rem', pb: '1rem', display: 'flex', justifyContent: 'center',
          }}
        >
          <Link to="/" component={RouterLink} sx={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">Go to Home</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  </Box>
);

export default TransactionNotFound;
