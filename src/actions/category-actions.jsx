import axios from 'axios';
import Cookies from 'js-cookie';
import {
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS,
  ADDING_CATEGORY,
} from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const addCategory = (_category) => async (dispatch) => {
  dispatch({ type: ADDING_CATEGORY });
  try {
    const jwt = Cookies.get('jwt');
    const res = await axios.post('/api/auth/sign-in', _category, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const { category } = await res.data;

    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: category });
  } catch (err) {
    const { errors } = err.response.data;

    dispatch({ type: ADD_CATEGORY_FAILURE, payload: errors });
  }
};
