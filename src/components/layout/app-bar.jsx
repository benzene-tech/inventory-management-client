import {
  AppBar as MuiAppBar,
  Avatar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Menu as MenuIcon } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../../actions/general-actions';

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    zIndex: theme.zIndex.drawer + 1,
  },
  brandStyle: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  avatarStyle: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const AppBar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div>
      <MuiAppBar xs={12} className={classes.rootStyle}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => dispatch(toggleDrawer())}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.brandStyle}>
            Enterprise Name
          </Typography>
          <IconButton>
            <Avatar className={classes.avatarStyle}>S</Avatar>
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

export default AppBar;
