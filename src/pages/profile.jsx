import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SaveIcon from '@material-ui/icons/Save';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import AppBar from '../components/layout/app-bar/app-bar';
import Footer from '../components/layout/footer';
import { updateUser, changePassword } from '../actions/users-actions';
// import { set } from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      overflow: 'hidden',
    },
  },
  footerStyle: {
    position: 'fixed',
    bottom: 0,
    width: '90%',
    marginLeft: '5%',
    marginBottom: theme.spacing(1.5),
  },
  textbox: {
    margin: '5px',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(35),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(40),
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(50),
    },
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phoneNumber: '',
  });
  const [tempUserData, setTempUserData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phoneNumber: '',
  });
  const [userCredential, setUserCredential] = useState({
    oldPassword: '',
    newPassword: '',
    reenterNewPassword: '',
  });
  const [userDataReadOnly, setReadOnlyUserData] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState('hidden');
  const [showEditButton, setShowEditButton] = useState('visible');
  const [showChangePassword, setShowChangePassword] = useState('visible');
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [firstNameFieldError, setFirstNameFieldError] = useState('');
  const [lastNameFieldError, setLastNameFieldError] = useState('');
  const [phoneNumberFieldError, setPhoneNumberFieldError] = useState('');
  const [oldPasswordFieldError, setOldPasswordFieldError] = useState('');
  const [newPasswordFieldError, setNewPasswordFieldError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [reenterNewPasswordFieldError, setReenterNewPasswordFieldError] =
    useState('');
  const [openChanePasswordDialogBox, setOpenChanePasswordDialogBox] =
    useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { jwt } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: { username: currentUser },
      });
      setTempUserData(res.data);
      setUserData(res.data);
    };
    fetchUserInfo();
  }, []);

  const handleFirstNameChange = (event) => {
    if (event.target.value !== '') setFirstNameFieldError('');
    setUserData({
      firstName: event.target.value,
      lastName: userData.lastName,
      dob: userData.dob,
      phoneNumber: userData.phoneNumber,
    });
  };

  const handleLastNameChange = (event) => {
    if (event.target.value !== '') setLastNameFieldError('');
    setUserData({
      firstName: userData.firstName,
      lastName: event.target.value,
      dob: userData.dob,
      phoneNumber: userData.phoneNumber,
    });
  };

  const handleDobChange = (event) => {
    setUserData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: event.target.value,
      phoneNumber: userData.phoneNumber,
    });
  };

  const handlePhoneNumberChange = (event) => {
    if (event.target.value !== '') setPhoneNumberFieldError('');
    setUserData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: userData.dob,
      phoneNumber: event.target.value,
    });
  };

  const handleClickOpenDialogBox = () => {
    setOpenDialogBox(true);
  };

  const handleCloseDialogBox = () => {
    setOpenDialogBox(false);
  };

  const handleOpenChangePasswordDialogBox = () => {
    setOpenChanePasswordDialogBox(true);
  };

  const handleCloseChangePasswordDialogBox = () => {
    setOpenChanePasswordDialogBox(false);
  };

  const handleOldPasswordChange = (event) => {
    if (event.target.value !== '') setOldPasswordFieldError('');
    setUserCredential({
      oldPassword: event.target.value,
      newPassword: userCredential.newPassword,
      reenterNewPassword: userCredential.reenterNewPassword,
    });
  };

  const handleNewPasswordChange = (event) => {
    setPasswordMatchError('');
    if (event.target.value !== '') setNewPasswordFieldError('');
    setUserCredential({
      oldPassword: userCredential.oldPassword,
      newPassword: event.target.value,
      reenterNewPassword: userCredential.reenterNewPassword,
    });
  };

  const handleReenterNewPasswordChange = (event) => {
    setPasswordMatchError('');
    if (event.target.value !== '') setReenterNewPasswordFieldError('');
    setUserCredential({
      oldPassword: userCredential.oldPassword,
      newPassword: userCredential.newPassword,
      reenterNewPassword: event.target.value,
    });
  };

  const enableEdit = () => {
    setShowChangePassword('hidden');
    setShowEditButton('hidden');
    setReadOnlyUserData(false);
    setShowSaveButton('visible');
  };

  const updateUserData = () => {
    setReadOnlyUserData(true);
    setShowSaveButton('hidden');
    setShowEditButton('visible');
    setShowChangePassword('visible');
    dispatch(
      updateUser(
        currentUser,
        userData.firstName,
        userData.lastName,
        userData.dob,
        userData.phoneNumber
      )
    );
  };

  const resetUserData = () => {
    setReadOnlyUserData(true);
    setShowSaveButton('hidden');
    setShowEditButton('visible');
    setShowChangePassword('visible');
    setUserData(tempUserData);
  };

  const changePasswordCredential = () => {
    dispatch(
      changePassword(
        currentUser,
        userCredential.oldPassword,
        userCredential.newPassword
      )
    );
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <div>
        <AppBar />
      </div>
      <div>
        <div
          style={{
            marginTop: '90px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={() => {
              if (showSaveButton === 'visible') {
                resetUserData();
                history.push('/profile');
              } else history.push('/');
            }}
            startIcon={<KeyboardBackspaceIcon />}
            style={{ fontSize: '12px', color: '#0000EE' }}
          >
            Back
          </Button>
          <Button
            startIcon={<VpnKeyIcon />}
            style={{ fontSize: '12px', visibility: showChangePassword }}
            onClick={() => {
              handleOpenChangePasswordDialogBox();
            }}
          >
            Change password
          </Button>
          <Dialog
            open={openChanePasswordDialogBox}
            onClose={handleCloseChangePasswordDialogBox}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Change password</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                required
                type="password"
                id="oldPassword"
                label="Old Password"
                variant="outlined"
                onChange={(e) => {
                  handleOldPasswordChange(e);
                }}
                helperText={oldPasswordFieldError}
                className={classes.textbox}
              />
              <TextField
                required
                type="password"
                id="nwePassword"
                label="New password"
                variant="outlined"
                onChange={(e) => {
                  handleNewPasswordChange(e);
                }}
                helperText={newPasswordFieldError}
                className={classes.textbox}
              />
              <TextField
                required
                type="password"
                id="reenterNwePassword"
                label="Re-enter new password"
                variant="outlined"
                onChange={(e) => {
                  handleReenterNewPasswordChange(e);
                }}
                helperText={passwordMatchError + reenterNewPasswordFieldError}
                className={classes.textbox}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  if (userCredential.oldPassword === '')
                    setOldPasswordFieldError('Old-pasword field is empty');
                  else if (userCredential.newPassword === '')
                    setNewPasswordFieldError('New-password field is empty');
                  else if (userCredential.reenterNewPassword === '')
                    setReenterNewPasswordFieldError(
                      'Re-enter new-password field is empty'
                    );
                  else if (
                    userCredential.newPassword !== '' &&
                    userCredential.reenterNewPassword !== '' &&
                    userCredential.newPassword !==
                      userCredential.reenterNewPassword
                  ) {
                    setPasswordMatchError(
                      'New password and re-enter new password not matching'
                    );
                  } else {
                    handleCloseChangePasswordDialogBox();
                    changePasswordCredential();
                  }
                }}
                color="primary"
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  handleCloseChangePasswordDialogBox();
                  history.push('/profile');
                }}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <form className={classes.formStyle}>
          <h2 style={{ textAlign: 'center' }}>User profile</h2>
          <TextField
            id="firstName"
            label="First name"
            value={userData.firstName}
            onChange={(e) => {
              handleFirstNameChange(e);
            }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: userDataReadOnly,
            }}
            helperText={firstNameFieldError}
            className={classes.textbox}
          />

          <TextField
            id="lastName"
            label="Last Name"
            value={userData.lastName}
            onChange={(e) => {
              handleLastNameChange(e);
            }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: userDataReadOnly,
            }}
            helperText={lastNameFieldError}
            className={classes.textbox}
          />
          <TextField
            id="dob"
            label="Date of birth"
            type="date"
            value={userData.dob.substring(0, 10)}
            onChange={(e) => {
              handleDobChange(e);
            }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: userDataReadOnly,
            }}
            className={classes.textbox}
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            value={userData.phoneNumber}
            onChange={(e) => {
              handlePhoneNumberChange(e);
            }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: userDataReadOnly,
            }}
            helperText={phoneNumberFieldError}
            className={classes.textbox}
          />
        </form>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
        }}
      >
        <Button
          style={{ margin: '10px', visibility: showSaveButton }}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={() => {
            if (userData.firstName === '')
              setFirstNameFieldError('Firstname field is empty');
            else if (userData.lastName === '')
              setLastNameFieldError('Lastname field is empty');
            else if (userData.phoneNumber === '')
              setPhoneNumberFieldError('Phone number field is empty');
            else handleClickOpenDialogBox();
          }}
        >
          Save
        </Button>
        <Dialog
          open={openDialogBox}
          onClose={handleCloseDialogBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to save profile?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleCloseDialogBox();
                updateUserData();
              }}
              color="primary"
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                handleCloseDialogBox();
                enableEdit();
              }}
              color="primary"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          style={{ margin: '10px', visibility: showEditButton }}
          variant="contained"
          color="primary"
          startIcon={<EditOutlinedIcon />}
          onClick={() => {
            enableEdit();
          }}
        >
          Edit
        </Button>
      </div>
      <Box className={classes.footerStyle}>
        <Footer />
      </Box>
    </div>
  );
};

export default Profile;
