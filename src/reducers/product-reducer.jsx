import {
  ADDING_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_FAILURE,
  PRODUCT_SUCCESS,
  CLOSE_SUCCESS_SNACKBAR,
  CLOSE_FAILURE_SNACKBAR,
} from '../constants/actions';

const initState = {
  products: {},
  message: '',
  errors: [{ message: '' }],
  loadingProduct: false,
  successSnackbar: false,
  failureSnackbar: false,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case ADDING_PRODUCT:
      return {
        ...state,
        loadingProduct: true,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        loadingProduct: true,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        loadingProduct: true,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loadingProduct: false,
        successSnackbar: true,
      };
    case PRODUCT_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loadingProduct: false,
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

export default productReducer;
