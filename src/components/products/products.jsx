import {
  makeStyles,
  Fab,
  GridList,
  Grid,
  Dialog,
  Avatar,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { Add } from '@material-ui/icons';
import emptyImage from '../../static/empty.svg';
import AddProduct from './add-product';
import SnackBar from '../general/snackbar';
import ViewProduct from './view-product';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
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
  tableStyle: {
    height: '370px',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(36),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(50),
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(60),
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
  avatarStyle: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarTextStyle: {
    paddingLeft: theme.spacing(2),
  },
}));

// eslint-disable-next-line arrow-body-style
const Products = () => {
  const classes = useStyles();
  const { jwt, storeId } = useSelector((state) => state.auth);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isViewProductOpen, setViewProductOpen] = useState(false);
  const { successSnackbar } = useSelector((state) => state.general);
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

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
  }, [successSnackbar]);

  const rows = productData.map((data) => ({
    id: data.name,
    avatar: data.imgURL,
    name: data.name,
    category: data.category,
    quantity: data.quantity,
  }));

  const renderAvatar = (params) => (
    <div className={classes.avatarStyle}>
      <Avatar variant="square" alt={params.row.name} src={params.row.avatar} />
      <p className={classes.avatarTextStyle}> {params.row.name}</p>
    </div>
  );

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      renderCell: renderAvatar,
    },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'quantity', headerName: 'quantity', width: 130 },
  ];

  const handleRowClick = (rowData) => {
    setSelectedProduct(
      productData.find((data) => data.name === rowData.row.name)
    );
    setViewProductOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.ProductStyle}>
        <h3>Products</h3>
        <GridList cellHeight={370} cols={1} className={classes.gridListStyle}>
          <Grid container className={classes.gridStyle}>
            {productData.length ? (
              <div className={classes.tableStyle}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  density="compact"
                  disableColumnMenu
                  disableSelectionOnClick
                  onRowClick={(rowData) => handleRowClick(rowData)}
                />
              </div>
            ) : (
              <img src={emptyImage} alt="Empty Poduct" />
            )}
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
      <Dialog
        open={isViewProductOpen}
        onClose={() => setViewProductOpen(false)}
      >
        <ViewProduct
          onClose={() => setViewProductOpen(false)}
          product={() => selectedProduct}
        />
      </Dialog>
      <SnackBar />
    </div>
  );
};

export default Products;
