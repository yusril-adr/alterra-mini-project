import { Routes, Route } from 'react-router-dom';

// Global Component
import Layout from './global/components/Layout';

// Pages
import Home from './pages/Home';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      {/* <Route path="about">
        <Route index element={<Navigate to="about-app" />} />
        <Route path="about-app" element={<AboutApp />} />
        <Route path="about-author" element={<AboutAuthor />} />
      </Route>

      <Route path="*" element={<NotFound />} /> */}
    </Route>
  </Routes>
);

export default App;
