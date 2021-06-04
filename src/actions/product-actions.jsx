import axios from 'axios';
import Cookies from 'js-cookie';
import {
  PRODUCT_FAILURE,
  PRODUCT_SUCCESS,
  ADDING_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const addProduct =
  ({ name, category, features, storeId, imgURL }) =>
  async (dispatch) => {
    dispatch({ type: ADDING_PRODUCT });
    try {
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

      dispatch({ type: PRODUCT_SUCCESS, payload: message });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: PRODUCT_FAILURE, payload: errors });
    }
  };

export const updateProduct =
  ({ name, features, imgUrl, storeId }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT });
    try {
      const attributes = features;
      const imgURL = imgUrl;
      const jwt = Cookies.get('jwt');
      const res = await axios.put(
        `/api/products/${name}`,
        {
          attributes,
          imgURL,
          storeId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const { message } = await res.data;

      dispatch({ type: PRODUCT_SUCCESS, payload: message });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: PRODUCT_FAILURE, payload: errors });
    }
  };

export const deleteProduct =
  ({ name, storeId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT });
    try {
      const jwt = Cookies.get('jwt');
      const res = await axios.delete(`/api/products/${name}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        data: {
          storeId,
        },
      });

      const { message } = await res.data;

      dispatch({ type: PRODUCT_SUCCESS, payload: message });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: PRODUCT_FAILURE, payload: errors });
    }
  };
