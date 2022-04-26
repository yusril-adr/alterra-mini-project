import { Link } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// MUI Color
import { blue, red } from '@mui/material/colors';

const TransactionInDay = () => (
  <Card sx={{ padding: '.75rem' }}>
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Typography variant="caption">
        Apr 26, 2022
      </Typography>

      <Typography variant="caption" sx={{ marginLeft: 'auto' }}>
        Balance : 100000
      </Typography>
    </Box>

    <Divider />

    <Link to="/">
      <Box component="span" sx={{ display: 'flex', alignItems: 'center', marginTop: '.75rem' }}>
        <Box
          sx={{
            color: '#fff',
            backgroundColor: blue.A400,
            borderRadius: '50%',
            padding: '.25rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          aria-label="Income"
        >
          <AddIcon />
        </Box>

        <Typography className="text-ellipsis" sx={{ ml: '.5rem' }}>
          Transaction 2 asjk
        </Typography>

        <Typography className="text-ellipsis" sx={{ ml: 'auto' }}>
          1000000
        </Typography>
      </Box>
    </Link>

    <Link to="/">
      <Box component="span" sx={{ display: 'flex', alignItems: 'center', marginTop: '.75rem' }}>
        <Box
          sx={{
            color: '#fff',
            backgroundColor: red.A400,
            borderRadius: '50%',
            padding: '.25rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          aria-label="Outcome"
        >
          <RemoveIcon />
        </Box>

        <Typography className="text-ellipsis" sx={{ ml: '.5rem' }}>
          Transaction 2
        </Typography>

        <Typography className="text-ellipsis" sx={{ ml: 'auto' }}>
          1000000
        </Typography>
      </Box>
    </Link>
  </Card>
);

export default TransactionInDay;
