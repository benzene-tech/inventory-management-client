import { SET_DRAWER_CONTEXT, TOGGLE_DRAWER } from '../constants/actions';

export const toggleDrawer = () => (dispatch) => {
  dispatch({ type: TOGGLE_DRAWER });
};

export const setDrawerContext = (drawerContext) => (dispatch) => {
  dispatch({ type: SET_DRAWER_CONTEXT, payload: { drawerContext } });
};
