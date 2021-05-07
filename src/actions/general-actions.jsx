import { TOGGLE_DRAWER } from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const toggleDrawer = () => (dispatch) => {
  dispatch({ type: TOGGLE_DRAWER });
};
