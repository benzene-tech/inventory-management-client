import axios from 'axios';
import Cookies from 'js-cookie';
import {
  CATEGORY_FAILURE,
  CATEGORY_SUCCESS,
  ADDING_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CLOSE_SUCCESS_SNACKBAR,
  CLOSE_FAILURE_SNACKBAR,
} from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const addCategory =
  ({ name, features }) =>
  async (dispatch) => {
    dispatch({ type: ADDING_CATEGORY });
    try {
      const attributes = features.map((feature) => ({
        name: feature.value,
      }));

      const jwt = Cookies.get('jwt');
      const res = await axios.post(
        '/api/products/category',
        {
          name,
          attributes,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const { message } = await res.data;

      dispatch({ type: CATEGORY_SUCCESS, payload: message });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: CATEGORY_FAILURE, payload: errors });
    }
  };

export const updateCategory =
  ({ name, features }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY });
    try {
      const attributes = features.map((feature) => ({
        name: feature.name,
      }));
      const jwt = Cookies.get('jwt');
      const res = await axios.put(
        `/api/products/category/${name}`,
        {
          name,
          attributes,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const { message } = await res.data;

      dispatch({ type: CATEGORY_SUCCESS, payload: message });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: CATEGORY_FAILURE, payload: errors });
    }
  };

export const deleteCategory =
  ({ name }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY });
    try {
      const jwt = Cookies.get('jwt');
      const res = await axios.delete(`/api/products/category/${name}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const { message } = await res.data;

      dispatch({ type: CATEGORY_SUCCESS, payload: message });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: CATEGORY_FAILURE, payload: errors });
    }
  };

export const closeSnackbar = (whichSnackbar) => async (dispatch) => {
  switch (whichSnackbar) {
    case 'SUCCESS':
      dispatch({ type: CLOSE_SUCCESS_SNACKBAR });
      break;
    case 'FAILURE':
      dispatch({ type: CLOSE_FAILURE_SNACKBAR });
      break;
    default:
      break;
  }
};
