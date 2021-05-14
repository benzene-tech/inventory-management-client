import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../constants/actions';

const initState = {
  currentUser: null,
  authToken: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        errors: null,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
