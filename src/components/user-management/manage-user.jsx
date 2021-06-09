/* eslint-disable no-console */
import { makeStyles, GridList, Grid, Avatar, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';
import addUsers from '../../static/addUsers.svg';

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

const ManageUsers = () => {
  const classes = useStyles();
  const { jwt, storeId } = useSelector((state) => state.auth);
  const { successSnackbar } = useSelector((state) => state.general);
  const [usersData, setUsersData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

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
      editable: isEdit,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone No',
      width: 130,
      editable: isEdit,
    },
    {
      field: 'dob',
      headerName: 'DOB',
      width: 130,
      type: 'date',
      editable: isEdit,
    },
    {
      field: 'userType',
      headerName: 'Role',
      width: 100,
      editable: isEdit,
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

  const handleEditCellChangeCommitted = React.useCallback(
    ({ id, field, props }) => {
      if (field) {
        const data = props;
        console.log(data.value);
        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            return { ...row, field };
          }
          return row;
        });
        console.log(updatedRows);
      }
    },
    [rows]
  );

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <Button
          color="primary"
          onClick={() => {
            if (isEdit) {
              console.log(rows);
              setIsEdit(false);
            } else {
              setIsEdit(true);
            }
          }}
          startIcon={isEdit ? <SaveIcon /> : <EditIcon />}
        >
          {isEdit ? 'Save' : 'Edit'}
        </Button>
      </GridToolbarContainer>
    );
  }

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
                  onEditCellChangeCommitted={handleEditCellChangeCommitted}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
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
