import { withStyles } from '@material-ui/core/styles';
import {
  makeStyles,
  GridList,
  Grid,
  Fab,
  Avatar,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Add } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SnackBar from '../general/snackbar';
import addUsers from '../../static/addUsers.svg';
import { deleteUser } from '../../actions/users-actions';
import AddUser from './add-user';

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
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  UsersStyle: {
    width: '100%',
  },
  gridListStyle: {
    width: '100%',
  },
  buttonStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(1),
  },
  tableStyle: {
    height: '380px',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(36),
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(50),
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(90),
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
}))(MuiDialogActions);

const ManageUsers = () => {
  const classes = useStyles();
  const { jwt, storeId } = useSelector((state) => state.auth);
  const { successSnackbar } = useSelector((state) => state.general);
  const [usersData, setUsersData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const usernames = usersData.map((user) => user.username);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/users/store', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          storeId,
        },
      });
      setUsersData(res.data);
    };
    fetchProducts();
  }, [successSnackbar]);

  const renderAvatar = (params) => (
    <div className={classes.avatarStyle}>
      <Avatar
        alt={params.row.firstName.toUpperCase()}
        src={params.row.username}
      />
      <p className={classes.avatarTextStyle}>
        {`${params.row.firstName} ${params.row.lastName}`}
      </p>
    </div>
  );

  const columns = [
    {
      field: 'firstName',
      headerName: 'Name',
      width: 190,
      renderCell: renderAvatar,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 130,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone No',
      width: 130,
    },
    {
      field: 'dob',
      headerName: 'DOB',
      width: 130,
      type: 'date',
    },
    {
      field: 'userType',
      headerName: 'Role',
      width: 100,
    },
  ];

  const rows = usersData.map((data) => ({
    id: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    phoneNumber: data.phoneNumber,
    dob: data.dob.substring(0, 10),
    userType: data.userType,
  }));

  const handleSelection = (newSelection) => {
    if (newSelection) {
      setSelectionModel(newSelection.selectionModel);
    } else {
      setSelectionModel(null);
    }
  };
  const handleClickAway = () => {
    setIsDelete(false);
    handleSelection(null);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{ justifyContent: 'space-between' }}>
        <GridToolbarExport />
        {isDelete ? (
          <div>
            <Button
              size="small"
              autoFocus
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setDeleteOpen(true);
              }}
            >
              Delete
            </Button>
            <Dialog
              onClose={() => setDeleteOpen(false)}
              open={deleteOpen}
              aria-labelledby="alert-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">Are you sure ?</DialogTitle>
              <DialogActions>
                <Button
                  onClick={() => {
                    dispatch(deleteUser({ selectedRow }));
                    setDeleteOpen(false);
                  }}
                  color="secondary"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    setDeleteOpen(false);
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
      </GridToolbarContainer>
    );
  }

  const handleRowClick = (rowData) => {
    setIsDelete(true);
    setSelectedRow(rowData.id);
  };

  return (
    <div className={classes.root}>
      <div className={classes.UsersStyle}>
        <h3>Manage Users</h3>
        <GridList cellHeight={380} cols={1} className={classes.gridListStyle}>
          <Grid container className={classes.gridStyle}>
            {usersData.length ? (
              <div className={classes.tableStyle}>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    disableColumnMenu
                    onSelectionModelChange={handleSelection}
                    selectionModel={selectionModel}
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                    onRowClick={(rowData) => handleRowClick(rowData)}
                  />
                </ClickAwayListener>
              </div>
            ) : (
              <img src={addUsers} alt="Add Users" />
            )}
          </Grid>
        </GridList>
        <div className={classes.buttonStyle}>
          <Fab
            color="primary"
            variant="extended"
            onClick={() => setIsAddUserOpen(true)}
          >
            <Add className={classes.extendedIcon} />
            User
          </Fab>
        </div>
        <Dialog open={isAddUserOpen} onClose={() => setIsAddUserOpen(false)}>
          <AddUser
            onClose={() => setIsAddUserOpen(false)}
            users={() => usernames}
          />
        </Dialog>
        <SnackBar />
      </div>
    </div>
  );
};

export default ManageUsers;
