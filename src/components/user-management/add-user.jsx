import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  makeStyles,
  LinearProgress,
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
import FormLabel from '@material-ui/core/FormLabel';
import Yup from 'yup';
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
    width: '160px',
    margin: theme.spacing(1),
  },
  radioStyle: {
    width: '200px',
    margin: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignContent: 'center',
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
  const { storeId, signingUp } = useSelector((state) => state.auth);

  const classes = useStyles();
  const dispatch = useDispatch();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      username: '',
      dob: '',
      userType: 'user',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Maximum 15 characters')
        .required('Required!'),
      lastName: Yup.string()
        .max(15, 'Maximum 15 characters')
        .required('Required!'),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .length(10, 'Phone number is not valid')
        .required('Required!'),
      username: Yup.string().required('Required!'),
      dob: Yup.date().required('Required!'),
    }),
    onSubmit: (values) => {
      dispatch(signUp(values, storeId));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {signingUp === true ? <LinearProgress /> : null}
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
                formik.errors.firstName &&
                formik.touched.firstName && <p>{formik.errors.firstName}</p>
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
                formik.errors.lastName &&
                formik.touched.lastName && <p>{formik.errors.lastName}</p>
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
                formik.errors.phoneNumber &&
                formik.touched.phoneNumber && <p>{formik.errors.phoneNumber}</p>
              }
            />

            <TextField
              id="dob"
              name="dob"
              type="date"
              label="dob"
              size="small"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textfieldStyle}
              onChange={formik.handleChange}
              value={formik.values.dob}
              helperText={
                formik.errors.dob &&
                formik.touched.dob && <p>{formik.errors.dob}</p>
              }
            />

            <TextField
              id="username"
              name="username"
              type="text"
              size="small"
              label="username"
              className={classes.textfieldStyle}
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              helperText={
                formik.errors.username &&
                formik.touched.username && <p>{formik.errors.username}</p>
              }
            />

            <div className={classes.radioStyle}>
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
            </div>
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