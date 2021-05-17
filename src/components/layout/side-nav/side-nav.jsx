import {
  Divider,
  Drawer,
  Hidden,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from '../../../actions/general-actions';
import SideNavItems from './side-nav-items';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  drawerStyle: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpenStyle: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerCloseStyle: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
}));

const SideNav = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { isDrawerOpen } = useSelector((state) => state.general);

  return (
    <div>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onBackdropClick={() => dispatch(toggleDrawer())}
        >
          <ListItem>
            <ListItemText primary="Hi, Vishnu Vardhan" />
          </ListItem>
          <Divider />
          <SideNavItems />
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          anchor="left"
          className={clsx(classes.drawerStyle, {
            [classes.drawerOpenStyle]: isDrawerOpen,
            [classes.drawerCloseStyle]: !isDrawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpenStyle]: isDrawerOpen,
              [classes.drawerCloseStyle]: !isDrawerOpen,
            }),
          }}
        >
          <Toolbar />
          <SideNavItems />
        </Drawer>
      </Hidden>
    </div>
  );
};

export default SideNav;
