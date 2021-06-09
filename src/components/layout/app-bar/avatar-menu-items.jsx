import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../../actions/auth-actions';
import avatarMenuItems from '../../../constants/avatar-menu-items';

const AvatarMenuItems = React.forwardRef(() => {
  const dispatch = useDispatch();
  const history = useHistory();

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
              if (item.text === 'Profile') {
                // eslint-disable-next-line no-console
                history.push('/profile');
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
