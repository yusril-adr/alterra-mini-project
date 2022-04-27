import PropTypes from 'prop-types';

// Assets
import loadingImg from '../../images/loading.svg';
import styles from './style.module.css';

const Loading = ({ title } = {}) => (
  <main className={styles.container}>
    <img src={loadingImg} alt="Loading ..." className={styles.image} />

    <h1 className={styles.loading_text}>{title}</h1>
  </main>
);

Loading.propTypes = {
  title: PropTypes.string,
};

Loading.defaultProps = {
  title: 'Loading ...',
};

export default Loading;
