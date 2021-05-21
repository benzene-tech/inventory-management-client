import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Chip,
  Grid,
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
import React from 'react';

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

  return (
    <>
      <DialogTitle onClose={() => onClose()}>Category</DialogTitle>
      <DialogContent dividers>
        <Grid container direction="column">
          <TextField
            disabled
            variant="outlined"
            className={classes.textfieldStyle}
            label="Name"
            value={name}
          />
          <li
            key={attributes.name}
            className={classes.listStyle}
            xs={11}
            sm={6}
            md={4}
          >
            {attributes.map((_feature) => (
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
        <Button autoFocus onClick={() => {}} color="primary">
          Edit
        </Button>
        <Button autoFocus onClick={() => {}} color="primary">
          Delete
        </Button>
      </DialogActions>
    </>
  );
};

ViewCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  category: PropTypes.func.isRequired,
};

export default ViewCategory;
