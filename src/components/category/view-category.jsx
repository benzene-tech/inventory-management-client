import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Chip,
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
import { Add } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { updateCategory, deleteCategory } from '../../actions/category-actions';

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

const ViewCategory = ({ category, onClose }) => {
  const classes = useStyles();
  const { name } = category();
  const { attributes } = category();
  const [newFeature, setNewFeature] = useState('');
  const [features, setFeatures] = useState(attributes);
  const [featureError, setFeatureError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { loadingCategory } = useSelector((state) => state.category);
  const { storeId } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {loadingCategory === true ? <LinearProgress /> : null}
      <DialogTitle onClose={() => onClose()}>Category</DialogTitle>
      <DialogContent dividers>
        <Grid container direction="column">
          <TextField
            color="primary"
            disabled
            variant="outlined"
            className={classes.textfieldStyle}
            label="Name"
            value={name}
          />
          {isEditing === true ? (
            <TextField
              error={featureError !== ''}
              variant="outlined"
              label="Features*"
              value={newFeature}
              className={classes.textfieldStyle}
              helperText={featureError}
              onChange={(e) => setNewFeature(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      if (
                        features.find((feature) => feature.name === newFeature)
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
                          name: newFeature,
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
          ) : null}
          <li
            key={attributes.name}
            className={classes.listStyle}
            xs={11}
            sm={6}
            md={4}
          >
            {isEditing &&
              features.map((_feature) => (
                <Chip
                  variant="outlined"
                  key={_feature.name}
                  className={classes.chipStyle}
                  label={_feature.name}
                  onDelete={() => {
                    setFeatures(() =>
                      features.filter(
                        (feature) => _feature.name !== feature.name
                      )
                    );
                  }}
                  color="primary"
                />
              ))}
            {!isEditing &&
              features.map((_feature) => (
                <Chip
                  variant="outlined"
                  key={_feature.name}
                  className={classes.chipStyle}
                  label={_feature.name}
                  color="primary"
                />
              ))}
          </li>
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
                    dispatch(deleteCategory({ name, storeId }));
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
              dispatch(updateCategory({ name, features, storeId }));
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

ViewCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  category: PropTypes.func.isRequired,
};

export default ViewCategory;
