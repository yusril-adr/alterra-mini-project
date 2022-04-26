// Package Components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// MUI Color
import { orange, red, blue } from '@mui/material/colors';

const SummaryTransaction = () => (
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

        <Typography sx={{ color: orange.A400 }}>
          100000
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
          Cash
        </Typography>

        <Typography sx={{ color: red.A400 }}>
          100000
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

        <Typography sx={{ color: blue.A400 }}>
          100000
        </Typography>
      </Grid>
    </Grid>
  </Card>
);

export default SummaryTransaction;
