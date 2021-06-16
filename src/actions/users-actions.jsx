/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  //   GET_USER,
  //   GET_ALL_USERS,
  UPDATE_USER,
  DELETE_USER,
  CHANGE_PASSWORD,
  USER_FAILURE,
  USER_SUCCESS,
} from '../constants/actions';

// export const getAllUsers = () => async (dispatch) => {
//   try {
//     const jwt = Cookies.get('jwt');
//     const res = await axios.get('/api/users', {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });

//     const { user } = await res.data;

//     dispatch({ type: GET_ALL_USERS, payload: user });
//     // eslint-disable-next-line no-empty
//   } catch (err) {}
// };

// export const getUser = (username) => async (dispatch) => {
//   try {
//     const jwt = Cookies.get('jwt');
//     const res = await axios.get('/api/users', {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//       params: { username },
//     });

//     const { user } = await res.data;

//     dispatch({ type: GET_USER, payload: user });
//     // eslint-disable-next-line no-empty
//   } catch (err) {}
// };

export const updateUser =
  (username, firstName, lastName, dob, phoneNumber) => async (dispatch) => {
    dispatch({ type: UPDATE_USER });
    try {
      const jwt = Cookies.get('jwt');

      const res = await axios.put(
        '/api/users',
        {
          firstName,
          lastName,
          dob,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: { username },
        }
      );
      const { user } = await res.data;

      dispatch({ type: USER_SUCCESS, payload: user });
    } catch (err) {
      const { errors } = err.res.data;

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

export const changePassword =
  (username, oldPassword, newPassword) => async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD });
    try {
      const jwt = Cookies.get('jwt');
      const res = await axios.put(
        '/api/users/changepassword',
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: { username },
        }
      );

      const { user } = await res.data;

      dispatch({ type: USER_SUCCESS, payload: user });
    } catch (err) {
      const { errors } = err.response.data;

      dispatch({ type: USER_FAILURE, payload: errors });
    }
  };
