import { withStyles } from '@material-ui/core/styles';
import {
  makeStyles,
  GridList,
  Grid,
  Avatar,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
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
import addUsers from '../../static/addUsers.svg';
import { deleteUser } from '../../actions/manage-user-actions';

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
      <Avatar alt={params.row.firstName} src={params.row.username} />
      <p className={classes.avatarTextStyle}> {params.row.firstName}</p>
    </div>
  );

  const columns = [
    {
      field: 'firstName',
      headerName: 'Name',
      width: 150,
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
    username: data.username,
    phoneNumber: data.phoneNumber,
    dob: data.dob.substring(0, 10),
    userType: data.userType,
  }));

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
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
    // eslint-disable-next-line no-console
    console.log(rowData);
  };

  return (
    <div className={classes.root}>
      <div className={classes.UsersStyle}>
        <h3>Manage Users</h3>
        <GridList cellHeight={370} cols={1} className={classes.gridListStyle}>
          <Grid container className={classes.gridStyle}>
            {usersData.length ? (
              <div className={classes.tableStyle}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={6}
                  disableColumnMenu
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  onRowClick={(rowData) => handleRowClick(rowData)}
                />
              </div>
            ) : (
              <img src={addUsers} alt="Add Users" />
            )}
          </Grid>
        </GridList>
      </div>
    </div>
  );
};

export default ManageUsers;
