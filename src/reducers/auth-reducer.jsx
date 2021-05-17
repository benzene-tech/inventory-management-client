import {
  SIGNING_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  SET_CURRENT_USER,
} from '../constants/actions';

const initState = {
  currentUser: null,
  authToken: null,
  signingIn: false,
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNING_IN:
      return {
        ...state,
        signingIn: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.username,
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
        errors: null,
      };
    default:
      return state;
  }
};

export default categoryReducer;
