import Cookies from 'js-cookie';
import {
  SIGNING_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGNING_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT,
  SET_CURRENT_USER,
} from '../constants/actions';

const initState = {
  currentUser: null,
  storeId: null,
  authToken: null,
  signingIn: false,
  signingUp: false,
  jwt: Cookies.get('jwt'),
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNING_IN:
      return {
        ...state,
        signingIn: true,
      };
    case SIGNING_UP:
      return {
        ...state,
        signingUp: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.username,
        storeId: action.payload.storeId,
        errors: null,
        signingIn: false,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        errors: action.payload,
        signingIn: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signingUp: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signingUp: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.username,
        errors: null,
      };
    case SIGN_OUT:
      return {
        ...state,
        currentUser: null,
        storeId: null,
        errors: null,
      };
    default:
      return state;
  }
};

export default authReducer;
