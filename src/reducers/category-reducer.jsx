import {
  ADDING_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_FAILURE,
  CATEGORY_SUCCESS,
  CLOSE_SUCCESS_SNACKBAR,
  CLOSE_FAILURE_SNACKBAR,
} from '../constants/actions';

const initState = {
  categories: {},
  message: '',
  addingCategory: false,
  updatingCategory: false,
  successSnackbar: false,
  failureSnackbar: false,
};

const generalReducer = (state = initState, action) => {
  switch (action.type) {
    case ADDING_CATEGORY:
      return {
        ...state,
        addingCategory: true,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        updatingCategory: true,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        addingCategory: false,
        successSnackbar: true,
      };
    case CATEGORY_FAILURE:
      return {
        ...state,
        addingCategory: false,
        failureSnackbar: true,
      };
    case CLOSE_SUCCESS_SNACKBAR:
      return {
        ...state,
        successSnackbar: false,
      };
    case CLOSE_FAILURE_SNACKBAR:
      return {
        ...state,
        failureSnackbar: false,
      };
    default:
      return state;
  }
};

export default generalReducer;
