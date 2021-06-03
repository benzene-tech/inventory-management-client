import {
  ADDING_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_FAILURE,
  CATEGORY_SUCCESS,
} from '../constants/actions';

const initState = {
  categories: {},
  loadingCategory: false,
};

const categoryReducer = (state = initState, action) => {
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
        loadingCategory: false,
      };
    case CATEGORY_FAILURE:
      return {
        ...state,
        loadingCategory: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
