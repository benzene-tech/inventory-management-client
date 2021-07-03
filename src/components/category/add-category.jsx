import {
  Button,
  Chip,
  Grid,
  LinearProgress,
  IconButton,
  TextField,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '@material-ui/icons';
import { addCategory } from '../../actions/category-actions';
import { DialogActions, DialogTitle, DialogContent } from '../general/dialog';

const useStyles = makeStyles((theme) => ({
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
}));

const AddCategory = ({ onClose }) => {
  const [features, setFeatures] = useState([]);
  const [name, setName] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [nameError, setNameError] = useState('');
  const [featureError, setFeatureError] = useState('');
  const { storeId } = useSelector((state) => state.auth);
  const { loadingCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      {loadingCategory === true ? <LinearProgress /> : null}
      <DialogTitle onClose={() => onClose()}>Add Category</DialogTitle>
      <DialogContent dividers>
        <Grid container direction="column">
          <TextField
            error={nameError !== ''}
            variant="outlined"
            className="textfield"
            label="Name*"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            helperText={nameError}
          />
          <TextField
            error={featureError !== ''}
            variant="outlined"
            label="Features*"
            value={newFeature}
            className="textfield"
            helperText={featureError}
            onChange={(e) => setNewFeature(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    if (
                      features.find((feature) => feature.value === newFeature)
                    ) {
                      setFeatureError('Feature already exists');
                      return;
                    }
                    if (newFeature === '') {
                      setFeatureError('Enter a feature');
                      return;
                    }
                    setFeatureError('');
                    setFeatures([
                      ...features,
                      {
                        key: features.length,
                        value: newFeature,
                      },
                    ]);
                    setNewFeature('');
                  }}
                >
                  <Add />
                </IconButton>
              ),
            }}
          />
          <li
            key={features.key}
            className={classes.listStyle}
            xs={11}
            sm={6}
            md={4}
          >
            {features.map((_feature) => (
              <Chip
                variant="outlined"
                key={_feature.key}
                className="chip"
                label={_feature.value}
                onDelete={() => {
                  setFeatures(() =>
                    features.filter((feature) => _feature.key !== feature.key)
                  );
                }}
                color="primary"
              />
            ))}
          </li>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            if (name === '') {
              setNameError('Enter the name');
            } else {
              setNameError('');
              dispatch(addCategory({ name, features, storeId }));
              setName('');
              setFeatures([]);
              setNewFeature('');
            }
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
};

AddCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddCategory;
