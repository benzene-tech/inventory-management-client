import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerContext } from '../../../actions/general-actions';
import sideNavItems from '../../../constants/side-nav-items';

const SideNavItems = () => {
  const { drawerContext } = useSelector((state) => state.general);

  const dispatch = useDispatch();

  return (
    <div>
      <List>
        {sideNavItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={drawerContext === item.text}
            onClick={() => dispatch(setDrawerContext(item.text))}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideNavItems;
