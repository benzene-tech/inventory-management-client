import {
  ADDING_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_FAILURE,
  PRODUCT_SUCCESS,
} from '../constants/actions';

const initState = {
  products: {},
  loadingProduct: false,
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
        loadingProduct: false,
      };
    case PRODUCT_FAILURE:
      return {
        ...state,
        loadingProduct: false,
      };
    default:
      return state;
  }
};

export default productReducer;
