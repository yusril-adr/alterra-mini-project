// MUI Components
import Box from '@mui/material/Box';

// Global Components
import SummaryTransaction from '../../components/SummaryTransaction';
import TransactionList from '../../components/TransactionList';
import AddTransaction from '../../components/AddTransaction';

const Home = () => (
  <Box sx={{ mt: '1.5rem' }}>
    <SummaryTransaction />

    <TransactionList />

    <AddTransaction />
  </Box>
);

export default Home;
