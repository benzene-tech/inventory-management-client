import axios from 'axios';
import Cookies from 'js-cookie';
import {
  SIGNING_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  SET_CURRENT_USER,
  SIGNING_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../constants/actions';

export const signIn = (credentials) => async (dispatch) => {
  dispatch({ type: SIGNING_IN });
  try {
    const res = await axios.post('/api/auth/sign-in', credentials);

    const { user } = res.data;

    window.localStorage.setItem('storeId', user.storeId);
    window.localStorage.setItem('userType', user.userType);

    dispatch({ type: SIGN_IN_SUCCESS, payload: user });
  } catch (err) {
    const { errors } = err.response.data;

    dispatch({ type: SIGN_IN_FAILURE, payload: errors });
  }
};

export const signUp =
  ({ firstName, lastName, dob, userType, username, phoneNumber }, storeId) =>
  async (dispatch) => {
    dispatch({ type: SIGNING_UP });
    try {
      const password = 'username@123';
      const res = await axios.post('/api/auth/sign-up', {
        firstName,
        lastName,
        dob,
        userType,
        username,
        phoneNumber,
        storeId,
        password,
      });

      const { message } = res.data;

      dispatch({ type: SIGN_UP_SUCCESS, payload: message });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: SIGN_UP_FAILURE, payload: errors });
    }
  };

export const getCurrentUser = () => async (dispatch) => {
  try {
    const jwt = Cookies.get('jwt');
    const res = await axios.get('/api/auth/current-user', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { user } = await res.data;

    dispatch({ type: SET_CURRENT_USER, payload: user });
    // eslint-disable-next-line no-empty
  } catch (err) {}
};

export const signOut = () => async (dispatch) => {
  try {
    const jwt = Cookies.get('jwt');

    await axios.post('/api/auth/sign-out', null, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: SIGN_OUT });
    // eslint-disable-next-line no-empty
  } catch (err) {}
};
