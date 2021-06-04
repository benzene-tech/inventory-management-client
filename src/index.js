import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { SET_CURRENT_USER } from './constants/actions';
import GlobalStyle from './globalStyles';
import rootReducer from './reducers/root-reducer';
import Routes from './routes';

const store = createStore(rootReducer, applyMiddleware(thunk));

const signInAttempt = async () => {
  try {
    const jwt = Cookies.get('jwt');
    const res = await axios.get('/api/auth/current-user', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { user } = await res.data;

    store.dispatch({ type: SET_CURRENT_USER, payload: user });
    // eslint-disable-next-line no-empty
  } catch (err) {}
};

signInAttempt().then(() => {
  ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <GlobalStyle />
      <CssBaseline />
      <Routes />
    </Provider>,
    document.getElementById('root')
  );
});
