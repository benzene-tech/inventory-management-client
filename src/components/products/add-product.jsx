/* eslint-disable no-nested-ternary */
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

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
});

const useStyles = makeStyles((theme) => ({
  textfieldStyle: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  listStyle: {
    listStyle: 'none',
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
  chipStyle: {
    margin: '5px',
    maxWidth: '120px',
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
}))(MuiDialogActions);

const AddProduct = ({ onClose }) => {
  const [name, setName] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [features, setFeatures] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const steps = ['Name', 'Features', 'Image'];
  const { jwt, storeId } = useSelector((state) => state.auth);

  const handleNext = () => {
    if (activeStep === 0) {
      if (name === '') {
        setNameError('Enter the name');
      } else {
        setNameError('');
      }
      if (category === '') {
        setCategoryError('Select the category');
      } else {
        setCategoryError('');
      }
      if (name !== '' && category !== '') {
        const selectedCategory = categoryList.find((o) => o.name === category);
        setFeatures(
          selectedCategory.attributes.map((attribute) => ({
            name: attribute.name,
            value: '',
          }))
        );
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep === 2) {
      // eslint-disable-next-line no-console
      console.log(features);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`/api/products/category/${storeId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setCategoryList(res.data);
    };
    fetchCategories();
  }, []);

  const classes = useStyles();
  return (
    <>
      <DialogTitle onClose={() => onClose()}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent dividers>
        {activeStep === 0 ? (
          <Grid container direction="column">
            <TextField
              error={nameError !== ''}
              variant="outlined"
              className={classes.textfieldStyle}
              label="Name*"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              helperText={nameError}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Category</InputLabel>
              <Select
                error={categoryError !== ''}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                {categoryList.map((categories) => (
                  <MenuItem key={categories.name} value={categories.name}>
                    {categories.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ) : activeStep === 1 ? (
          <Grid container direction="column">
            {features.map((feature) => (
              <TextField
                variant="outlined"
                key={feature.name}
                className={classes.textfieldStyle}
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
        ) : activeStep === 2 ? (
          <Grid container direction="column">
            <TextField
              variant="outlined"
              className={classes.textfieldStyle}
              label="Image URL"
              value={imgURL}
              onChange={(e) => {
                setImgURL(e.target.value);
              }}
            />
          </Grid>
        ) : null}
      </DialogContent>
      <DialogActions>
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Save' : 'Next'}
          </Button>
        </div>
      </DialogActions>
    </>
  );
};

AddProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddProduct;
