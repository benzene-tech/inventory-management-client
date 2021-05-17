import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../actions/auth-actions';
import avatarMenuItems from '../../../constants/avatar-menu-items';

const AvatarMenuItems = React.forwardRef(() => {
  const dispatch = useDispatch();

  return (
    <div>
      <List>
        {avatarMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              if (item.text === 'Sign Out') {
                // eslint-disable-next-line no-console
                dispatch(signOut());
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
});

AvatarMenuItems.displayName = 'AvatarMenuItems';

export default AvatarMenuItems;
