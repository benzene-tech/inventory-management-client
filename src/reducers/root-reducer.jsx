import { combineReducers } from 'redux';
import generalReducer from './general-reducer';

const rootReducer = combineReducers({
  general: generalReducer,
});

export default rootReducer;
