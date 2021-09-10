import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#31506B',
      main: '#1C2541',
      dark: '#0B132B',
      contrastText: '#fff',
    },
    secondary: {
      light: '#B4CDED',
      main: '#344966',
      dark: '#0D1821',
      contrastText: '#fff',
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
