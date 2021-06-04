import {
  Dialog,
  Fab,
  makeStyles,
  Chip,
  Card,
  GridList,
  Grid,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardHeader from '@material-ui/core/CardHeader';
import AddCategory from './add-category';
import ViewCategory from './view-category';
import addCategoryImage from '../../static/addCategory.svg';
import SnackBar from '../general/snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  chipStyle: {
    margin: '5px',
    maxWidth: '120px',
  },
  listStyle: {
    listStyle: 'none',
    width: theme.spacing(25),
    height: theme.spacing(5),
  },
  cardStyle: {
    width: '220px',
    height: '90px',
    padding: theme.spacing(1.35),
    margin: theme.spacing(0.75),
  },
  cardHeaderStyle: {
    padding: theme.spacing(0),
  },
  categoryStyle: {
    width: '100%',
  },
  gridListStyle: {
    width: '100%',
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  gridStyle: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Category = () => {
  const classes = useStyles();

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isViewCategoryOpen, setViewCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categoryData, setCategoryData] = useState([]);

  const { jwt, storeId } = useSelector((state) => state.auth);

  const { loadingProduct } = useSelector((state) => state.category);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`/api/products/category/${storeId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setCategoryData(res.data);
    };
    fetchCategories();
  }, [loadingProduct]);

  return (
    <div className={classes.root}>
      <div className={classes.categoryStyle}>
        <h3>Categories</h3>
        <GridList cellHeight={300} cols={1} className={classes.gridListStyle}>
          <Grid container className={classes.gridStyle}>
            {categoryData.length ? null : (
              <img
                className={classes.imgStyle}
                src={addCategoryImage}
                alt="Empty Category"
              />
            )}
            {categoryData.map((category) => (
              <Card
                className={classes.cardStyle}
                key={category.name}
                onClick={() => {
                  setViewCategoryOpen(true);
                  setSelectedCategory(category);
                }}
              >
                <CardHeader
                  className={classes.cardHeaderStyle}
                  title={category.name}
                />
                <li key={category.attributes} className={classes.listStyle}>
                  {category.attributes.map((_feature) => (
                    <Chip
                      variant="outlined"
                      key={_feature.name}
                      className={classes.chipStyle}
                      label={_feature.name}
                      color="primary"
                    />
                  ))}
                </li>
              </Card>
            ))}
          </Grid>
        </GridList>
      </div>
      <div className={classes.buttonStyle}>
        <Fab
          color="primary"
          variant="extended"
          onClick={() => setIsAddCategoryOpen(true)}
        >
          <Add className={classes.extendedIcon} />
          CATEGORY
        </Fab>
      </div>
      <Dialog
        open={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
      >
        <AddCategory onClose={() => setIsAddCategoryOpen(false)} />
      </Dialog>
      <Dialog
        open={isViewCategoryOpen}
        onClose={() => setViewCategoryOpen(false)}
      >
        <ViewCategory
          onClose={() => setViewCategoryOpen(false)}
          category={() => selectedCategory}
        />
      </Dialog>
      <SnackBar />
    </div>
  );
};

export default Category;
