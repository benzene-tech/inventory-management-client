import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import avatarMenuItems from '../../../constants/avatar-menu-items';

const AvatarMenuItems = () => (
  <div>
    <List>
      {avatarMenuItems.map((item) => (
        <ListItem button key={item.text}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  </div>
);

export default AvatarMenuItems;
