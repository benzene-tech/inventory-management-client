import {
  ADDING_CATEGORY,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS,
} from '../constants/actions';

const initState = {
  categories: [],
  addingCategory: false,
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
      };
    case ADD_CATEGORY_FAILURE:
      return {
        ...state,
        addingCategory: false,
      };
    default:
      return state;
  }
};

export default generalReducer;
