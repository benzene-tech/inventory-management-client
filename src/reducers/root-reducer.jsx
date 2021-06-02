import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import categoryReducer from './category-reducer';
import generalReducer from './general-reducer';
import productReducer from './product-reducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  general: generalReducer,
  auth: authReducer,
});

export default rootReducer;
