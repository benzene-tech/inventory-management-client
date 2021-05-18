import {
  ADDING_CATEGORY,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS,
  CLOSE_SUCCESS_SNACKBAR,
  CLOSE_FAILURE_SNACKBAR,
} from '../constants/actions';

const initState = {
  categories: [],
  addingCategory: false,
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
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        addingCategory: false,
        successSnackbar: true,
      };
    case ADD_CATEGORY_FAILURE:
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
