import { useSelector } from 'react-redux';

// MUI Components
import Box from '@mui/material/Box';

// Global Components
import TransactionInDay from '../TransactionInDay';
import TransactionHelper from '../../utils/TransactionHelper';

const TransactionList = () => {
  const transactions = useSelector((state) => state.transactions.value);
  const allDate = TransactionHelper.getAllDate(transactions);

  return (
    <Box
      sx={{
        mt: '1.5rem',
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: {
          xs: '.5rem',
          sm: '2rem 1rem',
        },
      }}
    >
      {allDate.map((date) => (
        <TransactionInDay key={date} date={date} />
      ))}

    </Box>
  );
};

export default TransactionList;
