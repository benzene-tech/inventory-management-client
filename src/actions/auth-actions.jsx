import axios from 'axios';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const signIn = (credentials) => async (dispatch) => {
  // dispatch({ type: TOGGLE_DRAWER });
  const res = await axios.post(credentials);

  const { user, errors } = res.data;

  if (!errors) {
    dispatch({ type: SIGN_IN_FAILURE, payload: errors });
  } else {
    dispatch({ type: SIGN_IN_SUCCESS, payload: user });
  }
};
