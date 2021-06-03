import { makeStyles, Fab, GridList, Grid, Dialog } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { Add } from '@material-ui/icons';
import emptyImage from '../../static/empty.svg';
import AddProduct from './add-product';
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
  ProductStyle: {
    width: '100%',
  },
  gridListStyle: {
    width: '100%',
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  imgStyle: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  tableStyle: {
    height: '300px',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(36),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(50),
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(58),
    },
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

function CustomNoRowsOverlay() {
  const classes = useStyles();

  return (
    <img className={classes.imgStyle} src={emptyImage} alt="Empty products" />
  );
}

// eslint-disable-next-line arrow-body-style
const Products = () => {
  const classes = useStyles();
  const { jwt, storeId } = useSelector((state) => state.auth);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { loadingProduct } = useSelector((state) => state.product);
  const [productData, setProductData] = useState([]);
  const rows = productData.map((data) => ({
    id: data.name,
    name: data.name,
    category: data.category,
    quantity: data.quantity,
  }));
  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'quantity', headerName: 'quantity', width: 130 },
  ];
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`/api/products/${storeId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setProductData(res.data);
    };
    fetchProducts();
  }, [loadingProduct]);

  return (
    <div className={classes.root}>
      <div className={classes.ProductStyle}>
        <h3>Products</h3>
        <GridList cellHeight={300} cols={1} className={classes.gridListStyle}>
          <Grid container className={classes.gridStyle}>
            <div className={classes.tableStyle}>
              <DataGrid
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                rows={rows}
                columns={columns}
                pageSize={4}
                checkboxSelection
                Density="compact"
              />
            </div>
          </Grid>
        </GridList>
      </div>
      <div className={classes.buttonStyle}>
        <Fab
          color="primary"
          variant="extended"
          onClick={() => setIsAddProductOpen(true)}
        >
          <Add className={classes.extendedIcon} />
          Product
        </Fab>
      </div>
      <Dialog
        open={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      >
        <AddProduct onClose={() => setIsAddProductOpen(false)} />
      </Dialog>
      <SnackBar />
    </div>
  );
};

export default Products;
