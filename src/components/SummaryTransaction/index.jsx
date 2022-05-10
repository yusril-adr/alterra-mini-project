import { useSelector } from 'react-redux';

// MUI Components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// MUI Color
import { orange, red, blue } from '@mui/material/colors';

// Utils
import TransactionHelper from '../../utils/TransactionHelper';
import MoneyFormatter from '../../utils/MoneyFormatter';

const SummaryTransaction = () => {
  const transactions = useSelector((state) => state.transactions.value);

  const { income, outcome, balance } = TransactionHelper.getAllSummary(transactions);

  return (
    <Card>
      <Grid container sx={{ minHeight: 100 }}>
        <Grid
          item
          xs
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Typography>
            Income
          </Typography>

          <Typography className="text-ellipsis" sx={{ color: orange.A400 }}>
            {MoneyFormatter.format(income)}
          </Typography>
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid
          item
          xs
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Typography>
            Outcome
          </Typography>

          <Typography className="text-ellipsis" sx={{ color: red.A400 }}>
            {MoneyFormatter.format(outcome)}
          </Typography>
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid
          item
          xs
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Typography>
            Balance
          </Typography>

          <Typography className="text-ellipsis" sx={{ color: blue.A400 }}>
            {MoneyFormatter.format(balance)}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SummaryTransaction;
