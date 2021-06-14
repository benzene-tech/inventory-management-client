import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { signUp } from '../../actions/auth-actions';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  textfieldStyle: {
    width: '100px',
    margin: theme.spacing(0.5),
  },
  inputGridStyle: {
    justifyContent: 'center',
  },
  formStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chipStyle: {
    margin: '5px',
    maxWidth: '120px',
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(28),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(40),
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(50),
    },
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
}))(MuiDialogActions);

const AddUser = ({ onClose }) => {
  const { storeId } = useSelector((state) => state.auth);

  const classes = useStyles();
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = 'Required';
    } else if (values.phoneNumber.length !== 10) {
      errors.phoneNumber = 'Invalid phoneNumber';
    }

    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length > 20) {
      errors.username = 'Must be 20 characters or less';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      username: '',
      dob: '',
      userType: 'user',
    },
    validate,
    onSubmit: (values) => {
      dispatch(signUp(values, storeId));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle onClose={() => onClose()}>Add User</DialogTitle>
        <DialogContent dividers>
          <Grid container direction="row" className={classes.inputGridStyle}>
            <TextField
              className={classes.textfieldStyle}
              id="firstName"
              name="firstName"
              label="First Name"
              size="small"
              variant="outlined"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              helperText={
                formik.errors.firstName ? (
                  <div>{formik.errors.firstName}</div>
                ) : null
              }
            />

            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              size="small"
              className={classes.textfieldStyle}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              helperText={
                formik.errors.lastName ? (
                  <div>{formik.errors.lastName}</div>
                ) : null
              }
            />

            <TextField
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              size="small"
              label="Phone-No"
              variant="outlined"
              className={classes.textfieldStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              helperText={
                formik.errors.phoneNumber ? (
                  <div>{formik.errors.phoneNumber}</div>
                ) : null
              }
            />

            <TextField
              id="dob"
              name="dob"
              type="date"
              label="dob"
              size="small"
              style={{ width: '170px' }}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textfieldStyle}
              onChange={formik.handleChange}
              value={formik.values.dob}
              helperText={
                formik.errors.dob ? <div>{formik.errors.dob}</div> : null
              }
            />

            <TextField
              id="username"
              name="username"
              type="text"
              size="small"
              label="user name"
              variant="outlined"
              className={classes.textfieldStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              helperText={
                formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null
              }
            />

            <FormControl component="fieldset">
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                name="userType"
                value={formik.values.userType}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            autoFocus
            onClick={formik.onSubmit}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </>
  );
};

AddUser.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddUser;
