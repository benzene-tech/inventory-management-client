import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import categoryReducer from './category-reducer';
import generalReducer from './general-reducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  general: generalReducer,
  auth: authReducer,
});

export default rootReducer;
