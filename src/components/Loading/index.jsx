import PropTypes from 'prop-types';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Assets
import styles from './style.module.css';

const Loading = ({ title } = {}) => (
  <Box
    component="main"
    sx={{
      position: 'absolute',
      inset: 0,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div className={styles.loading} />

    <Typography
      variant="h6"
      component="h1"
      sx={{
        mt: '2rem',
        fontWeight: 'normal',
      }}
    >
      {title}
    </Typography>
  </Box>
);

Loading.propTypes = {
  title: PropTypes.string,
};

Loading.defaultProps = {
  title: 'Loading ...',
};

export default Loading;
