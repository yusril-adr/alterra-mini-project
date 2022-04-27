// MUI Components
import Box from '@mui/material/Box';

// Global Components
import TransactionInDay from '../TransactionInDay';

const TransactionList = () => (
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
);

export default TransactionList;
