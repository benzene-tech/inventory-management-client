import axios from 'axios';
import Cookies from 'js-cookie';
import {
  USER_FAILURE,
  USER_SUCCESS,
  ADDING_USER,
  DELETE_USER,
} from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const addUser =
  ({ name, category, features, storeId, imgUrl }) =>
  async (dispatch) => {
    dispatch({ type: ADDING_USER });
    try {
      let imgURL;
      if (imgUrl === '') {
        imgURL = name;
      } else {
        imgURL = imgUrl;
      }
      const attributes = features;
      const jwt = Cookies.get('jwt');
      const res = await axios.post(
        '/api/products/',
        {
          name,
          category,
          attributes,
          storeId,
          imgURL,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const { message } = await res.data;

      dispatch({ type: USER_SUCCESS, payload: message });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: USER_FAILURE, payload: errors });
    }
  };

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
