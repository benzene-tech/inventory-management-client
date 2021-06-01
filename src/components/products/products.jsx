import { makeStyles, Fab, GridList, Grid, Dialog } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Add } from '@material-ui/icons';
import emptyImage from '../../static/empty.svg';
import AddProduct from './add-product';

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
    maxHeight: '100%',
    maxWidth: '100%',
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
// eslint-disable-next-line arrow-body-style
const Products = () => {
  const classes = useStyles();
  const { jwt, storeId } = useSelector((state) => state.auth);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const [productData, setProductData] = useState([]);

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
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.ProductStyle}>
        <h3>Products</h3>
        <GridList cellHeight={300} cols={1} className={classes.gridListStyle}>
          <Grid container className={classes.gridStyle}>
            {productData.length ? null : (
              <img
                className={classes.imgStyle}
                src={emptyImage}
                alt="Empty products"
              />
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
    </div>
  );
};

export default Products;
