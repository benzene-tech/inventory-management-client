/* eslint-disable no-nested-ternary */
import {
  Button,
  Grid,
  TextField,
  makeStyles,
  LinearProgress,
  FormHelperText,
} from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { addProduct } from '../../actions/product-actions';
import { DialogActions, DialogTitle, DialogContent } from '../general/dialog';

const useStyles = makeStyles((theme) => ({
  textfieldStyle: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  smallTextfieldStyle: {
    width: '100px',
    margin: theme.spacing(0.5),
  },
  stepperStyle: {
    padding: theme.spacing(0),
  },
  inputGridStyle: {
    justifyContent: 'center',
  },
  dialogStyle: {
    maxHeight: theme.spacing(25),
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
}));

const AddProduct = ({ onClose }) => {
  const [name, setName] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [features, setFeatures] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const steps = ['Name', 'Features', 'Image'];
  const { jwt, storeId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { loadingProduct } = useSelector((state) => state.product);
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
      dispatch(addProduct({ name, category, features, storeId, imgUrl }));
      setName('');
      setCategory('');
      setFeatures([]);
      setimgUrl('');
      setActiveStep(0);
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
      if (res.data.length) setCategoryList(res.data);
    };
    fetchCategories();
  }, []);

  const classes = useStyles();
  return (
    <>
      {loadingProduct === true ? <LinearProgress /> : null}
      <DialogTitle onClose={() => onClose()}>
        <Stepper
          className={classes.stepperStyle}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogStyle}>
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
                disabled={!categoryList.length}
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
              {!categoryList.length ? (
                <FormHelperText>No Category Added</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        ) : activeStep === 1 ? (
          <Grid container direction="row" className={classes.inputGridStyle}>
            {features.map((feature) => (
              <TextField
                variant="outlined"
                key={feature.name}
                size="small"
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
        ) : activeStep === 2 ? (
          <Grid container direction="column">
            <TextField
              variant="outlined"
              className={classes.textfieldStyle}
              label="Image URL"
              value={imgUrl}
              onChange={(e) => {
                setimgUrl(e.target.value);
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
