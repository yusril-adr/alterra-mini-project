// import { Link } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';

// MUI Icons
// import AddIcon from '@mui/icons-material/Add';

// Components
import SummaryTransaction from './components/SummaryTransaction';
import TransactionInDay from './components/TransactionInDay';
import AddTransaction from './components/AddTransaction';

const Home = () => (
  <Box sx={{ mt: '1.5rem' }}>
    <SummaryTransaction />

    <Box
      sx={{
        mt: '1.5rem',
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
        gap: {
          xs: '2rem 1rem',
        },
      }}
    >
      <TransactionInDay />

      <TransactionInDay />

      <TransactionInDay />

      <TransactionInDay />

      <TransactionInDay />

      <TransactionInDay />

    </Box>

    <AddTransaction />
  </Box>
);

export default Home;
