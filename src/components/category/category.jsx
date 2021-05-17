/* eslint-disable no-unused-vars */
import { Dialog, Fab, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import AddCategory from './add-category';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Category = () => {
  const classes = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Fab
        color="primary"
        variant="extended"
        onClick={() => setIsModalOpen(true)}
      >
        <Add className={classes.extendedIcon} />
        CATEGORY
      </Fab>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddCategory onClose={() => setIsModalOpen(false)} />
      </Dialog>
    </div>
  );
};

export default Category;
