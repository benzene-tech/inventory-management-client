import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import AppBar from './app-bar/app-bar';
import Footer from './footer';
import SideNav from './side-nav/side-nav';

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    display: 'flex',
  },
  toolbarStyle: {
    ...theme.mixins.toolbar,
  },
  contentStyle: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  footerStyle: {
    marginTop: theme.spacing(2),
    bottom: 0,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.rootStyle}>
      <AppBar />
      <SideNav />
      <div className={classes.contentStyle}>
        <div className={classes.toolbarStyle} />
        {children}
        <div className={classes.footerStyle}>
          <Footer />
        </div>
      </div>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
