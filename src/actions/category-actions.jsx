import axios from 'axios';
import Cookies from 'js-cookie';
import {
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS,
  ADDING_CATEGORY,
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

      // eslint-disable-next-line no-console
      console.log(attributes);

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

      const { category } = await res.data;

      dispatch({ type: ADD_CATEGORY_SUCCESS, payload: category });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: ADD_CATEGORY_FAILURE, payload: errors });
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
