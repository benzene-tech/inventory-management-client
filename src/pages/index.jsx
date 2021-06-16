/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Category from '../components/category/category';
import Layout from '../components/layout/layout';
import Products from '../components/products/products';
import UserManagement from '../components/user-management/manage-user';

const Index = () => {
  const { drawerContext } = useSelector((state) => state.general);

  return (
    <div>
      <Layout>
        {drawerContext === 'Category' ? (
          <Category />
        ) : drawerContext === 'Products' ? (
          <Products />
        ) : drawerContext === 'User Management' ? (
          <UserManagement />
        ) : (
          <Typography variant="h4">Under Construction</Typography>
        )}
      </Layout>
    </div>
  );
};

export default Index;
