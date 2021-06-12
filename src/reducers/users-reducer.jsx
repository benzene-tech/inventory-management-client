import {
  UPDATE_USER,
  CHANGE_PASSWORD,
  DELETE_USER,
  USER_FAILURE,
  USER_SUCCESS,
} from '../constants/actions';

const initState = {
  users: {},
  message: '',
  errors: [{ message: '' }],
  loadingUser: false,
  successSnackbar: false,
  failureSnackbar: false,
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        loadingUser: true,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        loadingUser: true,
      };
    case DELETE_USER:
      return {
        ...state,
        loadingUser: true,
      };
    case USER_FAILURE:
      return {
        ...state,
        message: action.payload,
        loadingUser: false,
        failureSnackbar: true,
      };
    case USER_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loadingUser: false,
        successSnackbar: true,
      };
    default:
      return state;
  }
};

export default usersReducer;
