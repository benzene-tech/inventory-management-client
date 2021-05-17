import {
  BarChart,
  Category,
  Group,
  Store,
  SwapHoriz,
} from '@material-ui/icons';
import React from 'react';

const sideNavItems = [
  {
    icon: <BarChart />,
    text: 'Dashboard',
  },
  {
    icon: <Store />,
    text: 'Products',
  },
  {
    icon: <Category />,
    text: 'Category',
  },
  {
    icon: <SwapHoriz />,
    text: 'Stock Management',
  },
  {
    icon: <Group />,
    text: 'User Management',
  },
];

export default sideNavItems;
