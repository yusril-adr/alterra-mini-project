/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloProvider,
} from '@apollo/client';
import { Provider } from 'react-redux';

// Lazy Loading
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// CSS Assets
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

// GraphQL Client
import client from './services/apollo/client';

// Redux Store
import store from './services/redux/store';

// Utils
import reportWebVitals from './utils/reportWebVitals';
import { register as SWRegister, unregister as SWUnregister } from './utils/SWRegister';

// Components
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line no-console
  reportWebVitals(console.log);
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://cra.link/PWA
  SWUnregister();
} else {
  SWRegister();
}
