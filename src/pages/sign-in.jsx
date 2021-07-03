import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn } from '../actions/auth-actions';
import Footer from '../components/layout/footer';

const useStyles = makeStyles((theme) => ({
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '30vh',
  },
  linkStyle: {
    marginTop: theme.spacing(-1.5),
    marginBottom: theme.spacing(2),
  },
  buttonStyle: {
    width: '100%',
  },
  footerStyle: {
    position: 'fixed',
    bottom: 0,
    width: '90%',
    marginLeft: '5%',
    marginBottom: theme.spacing(1.5),
  },
}));

const SignIn = () => {
  const dispatch = useDispatch();

  const { currentUser, signingIn } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(signIn(values));
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const classes = useStyles();

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {signingIn === true ? <LinearProgress /> : null}
      <Grid container direction="column">
        <form onSubmit={formik.handleSubmit} className={classes.formStyle}>
          <Grid container item xs={11} sm={6} md={4}>
            <TextField
              id="username"
              label="Username*"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              className="textfield"
            />
          </Grid>
          <Grid container item xs={11} sm={6} md={4}>
            <TextField
              id="password"
              label="Password*"
              variant="outlined"
              type={isPasswordVisible === true ? null : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible === true ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                ),
              }}
              className="textfield"
            />
          </Grid>
          <Grid item xs={11} sm={6} md={4} className={classes.linkStyle}>
            <Link href="/forgot-password" variant="body2">
              Forgot Password?
            </Link>
          </Grid>
          <Grid container item xs={11} sm={6} md={4}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="primary"
              className={classes.buttonStyle}
              onSubmit={formik.handleSubmit}
            >
              SIGN IN
            </Button>
          </Grid>
        </form>
      </Grid>
      <Box className={classes.footerStyle}>
        <Footer />
      </Box>
    </div>
  );
};

export default SignIn;
