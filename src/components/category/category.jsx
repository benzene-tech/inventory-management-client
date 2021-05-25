import {
  Dialog,
  Fab,
  makeStyles,
  Chip,
  Card,
  GridList,
  Snackbar,
  Grid,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CardHeader from '@material-ui/core/CardHeader';
import MuiAlert from '@material-ui/lab/Alert';
import AddCategory from './add-category';
import ViewCategory from './view-category';
import { closeSnackbar } from '../../actions/category-actions';

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

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Category = () => {
  const classes = useStyles();

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isViewCategoryOpen, setViewCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();

  const { jwt } = useSelector((state) => state.auth);

  const { errors, message, successSnackbar, failureSnackbar } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('/api/products/category', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setCategoryData(res.data);
    };
    fetchCategories();
  }, [successSnackbar]);

  return (
    <div className={classes.root}>
      <div className={classes.categoryStyle}>
        <GridList cellHeight={300} cols={1} className={classes.gridListStyle}>
          <Grid container className={classes.gridStyle}>
            {categoryData.length ? null : <h1>Please add a Category</h1>}
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
      <Snackbar
        open={successSnackbar}
        autoHideDuration={6000}
        onClose={() => dispatch(closeSnackbar('SUCCESS'))}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar('SUCCESS'))}
          severity="success"
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureSnackbar}
        autoHideDuration={6000}
        onClose={() => dispatch(closeSnackbar('FAILURE'))}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar('FAILURE'))}
          severity="error"
        >
          {errors[0].message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Category;
