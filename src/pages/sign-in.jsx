import {
  Button,
  Grid,
  IconButton,
  Link,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import Footer from '../components/layout/footer';

const useStyles = makeStyles((theme) => ({
  rootStyle: {},
  textfieldStyle: {
    width: '100%',
    marginBottom: theme.spacing(2),
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
    width: '100%',
    marginBottom: theme.spacing(1.5),
  },
}));

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      console.log(values);
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const classes = useStyles();
  return (
    <div>
      <Grid container direction="column">
        <form onSubmit={formik.handleSubmit}>
          <Grid container item xs={12} md={3}>
            <TextField
              id="username"
              label="Username*"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              className={classes.textfieldStyle}
            />
          </Grid>
          <Grid container item xs={12} md={3}>
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
              className={classes.textfieldStyle}
            />
          </Grid>
          <Grid item xs={12} md={3} className={classes.linkStyle}>
            <Link href="/forgot-password" variant="body2">
              Forgot Password?
            </Link>
          </Grid>
          <Grid container item xs={12} md={3}>
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
        <Grid className={classes.footerStyle}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
