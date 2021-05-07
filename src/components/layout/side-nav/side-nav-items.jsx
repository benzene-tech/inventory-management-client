import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useState } from 'react';
import sideNavItems from '../../../constants/side-nav-items';

const SideNavItems = () => {
  const [selected, setSelected] = useState('Dashboard');

  return (
    <div>
      <List>
        {sideNavItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={selected === item.text}
            onClick={() => setSelected(item.text)}
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
