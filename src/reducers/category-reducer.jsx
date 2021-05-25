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
  errors: [],
  loadingCategory: false,
  successSnackbar: false,
  failureSnackbar: false,
};

const generalReducer = (state = initState, action) => {
  switch (action.type) {
    case ADDING_CATEGORY:
      return {
        ...state,
        loadingCategory: true,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        loadingCategory: true,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        loadingCategory: true,
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loadingCategory: false,
        successSnackbar: true,
      };
    case CATEGORY_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loadingCategory: false,
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
