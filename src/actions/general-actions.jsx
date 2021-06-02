import {
  SET_DRAWER_CONTEXT,
  TOGGLE_DRAWER,
  CLOSE_SUCCESS_SNACKBAR,
  CLOSE_FAILURE_SNACKBAR,
} from '../constants/actions';

export const toggleDrawer = () => (dispatch) => {
  dispatch({ type: TOGGLE_DRAWER });
};

export const setDrawerContext = (drawerContext) => (dispatch) => {
  dispatch({ type: SET_DRAWER_CONTEXT, payload: { drawerContext } });
};

export const closeSnackbar = (whichSnackbar) => async (dispatch) => {
  switch (whichSnackbar) {
    case 'SUCCESS':
      dispatch({ type: CLOSE_SUCCESS_SNACKBAR });
      break;
    case 'FAILURE':
      dispatch({ type: CLOSE_FAILURE_SNACKBAR });
      break;
    default:
      break;
  }
};
