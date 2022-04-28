import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

// MUI Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// MUI Color
import { blue, red } from '@mui/material/colors';

// Utils
import TransactionHelper from '../../utils/TransactionHelper';
import MoneyFormatter from '../../utils/MoneyFormatter';
import CONFIG from '../../global/CONFIG';

const TransactionInDay = ({ date, transactions }) => {
  const transactionsInDay = TransactionHelper.getTransactionsInDay(date, transactions);
  const balance = TransactionHelper.getBalanceTotal(transactionsInDay);

  return (
    <Card sx={{ padding: '.75rem' }}>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Typography variant="caption">
          {moment(date).format('MMM DD, YYYY')}
        </Typography>

        <Typography variant="caption" sx={{ marginLeft: 'auto' }}>
          Balance : {MoneyFormatter.format(balance)}
        </Typography>
      </Box>

      <Divider />

      {transactionsInDay.map(({
        id, title, type, credit,
      }) => (
        <Link
          key={id}
          component={RouterLink}
          to={`/transaction/${id}`}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            ':hover': {
              color: blue.A400,
            },
          }}
        >
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', marginTop: '.75rem' }}>
            <Box
              sx={{
                color: '#fff',
                backgroundColor: type.toLowerCase() === 'income' ? blue.A400 : red.A400,
                borderRadius: '50%',
                padding: '.25rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              aria-label={type}
            >
              {type.toLowerCase() === 'income' ? <AddIcon /> : <RemoveIcon />}
            </Box>

            <Typography className="text-ellipsis" sx={{ ml: '.5rem' }}>
              {title.length > CONFIG.TRANSACTION_TITLE_MAX_LENGTH ? `${title.slice(0, CONFIG.TRANSACTION_TITLE_MAX_LENGTH)}...` : title}
            </Typography>

            <Typography className="text-ellipsis" sx={{ ml: 'auto' }}>
              {MoneyFormatter.format(credit)}
            </Typography>
          </Box>
        </Link>
      ))}
    </Card>
  );
};

TransactionInDay.propTypes = {
  date: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default TransactionInDay;
