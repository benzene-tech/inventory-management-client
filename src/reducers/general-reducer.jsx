import { SET_DRAWER_CONTEXT, TOGGLE_DRAWER } from '../constants/actions';

const initState = {
  isDrawerOpen: false,
  drawerContext: 'Dashboard',
};

const generalReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case SET_DRAWER_CONTEXT:
      return { ...state, drawerContext: action.payload.drawerContext };
    default:
      return state;
  }
};

export default generalReducer;
