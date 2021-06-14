import axios from 'axios';
import Cookies from 'js-cookie';
import { USER_FAILURE, USER_SUCCESS, DELETE_USER } from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const deleteUser =
  ({ selectedRow }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_USER });
    const username = selectedRow;
    try {
      const jwt = Cookies.get('jwt');
      const res = await axios.delete('/api/users', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          username,
        },
      });

      const { message } = await res.data;

      dispatch({ type: USER_SUCCESS, payload: message });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: USER_FAILURE, payload: errors });
    }
  };
