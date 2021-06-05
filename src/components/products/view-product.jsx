import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  LinearProgress,
  IconButton,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, deleteProduct } from '../../actions/product-actions';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  headerText: {
    display: 'flex',
    alignItems: 'center',
  },
});

const useStyles = makeStyles((theme) => ({
  textfieldStyle: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  smallTextfieldStyle: {
    width: '100px',
    margin: theme.spacing(1),
  },
  inputGridStyle: {
    justifyContent: 'center',
  },
  productImageStyle: {
    maxWidth: '200px',
    maxHeight: '200px',
    padding: theme.spacing(1),
    alignSelf: 'center',
  },
  textStyle: {
    marginLeft: theme.spacing(1),
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.headerText} variant="h6">
        {children}
      </Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(35),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(40),
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(50),
    },
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
}))(MuiDialogActions);

const ViewProduct = ({ product, onClose }) => {
  const classes = useStyles();
  const { name } = product();
  const { category } = product();
  const { imgURL } = product();
  const { attributes } = product();
  const [features, setFeatures] = useState(attributes);
  const [imgUrl, setImgUrl] = useState(imgURL);
  const [isEditing, setIsEditing] = useState(false);
  const { loadingCategory } = useSelector((state) => state.category);
  const { storeId } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {loadingCategory === true ? <LinearProgress /> : null}
      <DialogTitle onClose={() => onClose()}>
        {name}
        <Typography className={classes.textStyle}>{category}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container direction="column">
          <Grid container direction="row" className={classes.inputGridStyle}>
            {features.map((feature) => (
              <TextField
                variant="outlined"
                key={feature.name}
                size="small"
                disabled={!isEditing}
                className={classes.smallTextfieldStyle}
                label={feature.name}
                value={feature.value}
                onChange={(e) => {
                  const elementsIndex = features.findIndex(
                    (element) => element.name === feature.name
                  );
                  const newFeatures = [...features];
                  newFeatures[elementsIndex] = {
                    ...newFeatures[elementsIndex],
                    value: e.target.value,
                  };
                  setFeatures(newFeatures);
                }}
              />
            ))}
          </Grid>
          {isEditing === true ? (
            <TextField
              variant="outlined"
              className={classes.textfieldStyle}
              label="Image URL"
              value={imgUrl}
              onChange={(e) => {
                setImgUrl(e.target.value);
              }}
            />
          ) : (
            <img
              src={imgUrl}
              alt={name}
              className={classes.productImageStyle}
            />
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        {isEditing === false ? (
          <Button
            autoFocus
            onClick={() => {
              setIsEditing(true);
            }}
            color="primary"
          >
            Edit
          </Button>
        ) : null}
        {isEditing === false ? (
          <div>
            <Button
              autoFocus
              color="secondary"
              onClick={() => {
                setOpen(true);
              }}
            >
              Delete
            </Button>
            <Dialog
              open={open}
              onClick={() => {
                setOpen(false);
              }}
              aria-labelledby="alert-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">Are you sure ?</DialogTitle>
              <DialogActions>
                <Button
                  onClick={() => {
                    dispatch(deleteProduct({ name, storeId }));
                    onClose();
                  }}
                  color="secondary"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  color="primary"
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : null}
        {isEditing === true ? (
          <Button
            autoFocus
            onClick={() => {
              dispatch(updateProduct({ name, features, imgUrl, storeId }));
              setIsEditing(false);
            }}
            color="primary"
          >
            Save
          </Button>
        ) : null}
      </DialogActions>
    </>
  );
};

ViewProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
  product: PropTypes.func.isRequired,
};

export default ViewProduct;
