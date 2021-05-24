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
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add } from '@material-ui/icons';
import { addCategory } from '../../actions/category-actions';

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

const AddCategory = ({ onClose }) => {
  const [features, setFeatures] = useState([]);
  const [name, setName] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const { addingCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      {addingCategory === true ? <LinearProgress /> : null}
      <DialogTitle onClose={() => onClose()}>Add Category</DialogTitle>
      <DialogContent dividers>
        <Grid container direction="column">
          <TextField
            variant="outlined"
            className={classes.textfieldStyle}
            label="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Features*"
            value={newFeature}
            className={classes.textfieldStyle}
            onChange={(e) => setNewFeature(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    if (newFeature === '') {
                      return;
                    }
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
                className={classes.chipStyle}
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
            dispatch(addCategory({ name, features }));
            setName('');
            setFeatures([]);
            setNewFeature('');
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
