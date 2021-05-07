import { TOGGLE_DRAWER } from '../constants/actions';

const initState = {
  isDrawerOpen: false,
};

const generalReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    default:
      return state;
  }
};

export default generalReducer;
