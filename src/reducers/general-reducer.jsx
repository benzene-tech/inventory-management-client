import {
  SET_DRAWER_CONTEXT,
  TOGGLE_DRAWER,
  CATEGORY_FAILURE,
  CATEGORY_SUCCESS,
  CLOSE_SUCCESS_SNACKBAR,
  CLOSE_FAILURE_SNACKBAR,
  PRODUCT_FAILURE,
  PRODUCT_SUCCESS,
} from '../constants/actions';

const initState = {
  isDrawerOpen: false,
  drawerContext: 'Dashboard',
  message: '',
  errors: [{ message: '' }],
  successSnackbar: false,
  failureSnackbar: false,
};

const generalReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case SET_DRAWER_CONTEXT:
      return { ...state, drawerContext: action.payload.drawerContext };
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

export default generalReducer;
