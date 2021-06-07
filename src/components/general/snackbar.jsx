import { Snackbar } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { closeSnackbar } from '../../actions/general-actions';

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = () => {
  const { errors, message, successSnackbar, failureSnackbar } = useSelector(
    (state) => state.general
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Snackbar
        open={successSnackbar}
        autoHideDuration={6000}
        onClose={() => dispatch(closeSnackbar('SUCCESS'))}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar('SUCCESS'))}
          severity="success"
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureSnackbar}
        autoHideDuration={6000}
        onClose={() => dispatch(closeSnackbar('FAILURE'))}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar('FAILURE'))}
          severity="error"
        >
          {errors[0].message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;
