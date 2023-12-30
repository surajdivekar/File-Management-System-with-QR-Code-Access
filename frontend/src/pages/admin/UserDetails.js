import React, { useCallback, useEffect, useState } from "react";
import UserForm from "../admin/UserForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Paper from "@mui/material/Paper";
import {
  Box,
  Fade,
  IconButton,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import InputAdornment from "@mui/material/InputAdornment";

import useTable from "../../components/useTable";
import * as allServices from "../../controller/authController";

import Controls from "../../components/controls/Controls";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Popup from "../../components/Popup";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: "70%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  sendButton: {
    position: "absolute",
    right: "160px",
  },
  selectCount: {
    margin: theme.spacing(-20),
  },
}));

const headCells = [
  { id: "srno", label: "Sr. No." },
  { id: "id", label: "User Id" },
  { id: "name", label: "User Name" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile Number" },

  { id: "actions", label: "Actions", disableSorting: true },
];

export default function UserDetails() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);

  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupsendMail, setopenPopupsendMail] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const FetchData = useCallback(async () => {
    const data = await allServices.getAllUsers();
    setRecords(data);
  }, []);

  useEffect(() => {
    FetchData();
  }, [FetchData]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    TblEmptyRows,

    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.user_name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = async (user, resetForm) => {
    // console.log(user);
    if (user.user_id === 0) {
      const res = await allServices.createUser(user);
      setNotify({
        isOpen: true,

        message: res,
        type: "success",
      });
    } else {
      const res = await allServices.updateUser(user);
      setNotify({
        isOpen: true,
        message: res,
        type: "success",
      });
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    // setRecords(customerServices.getAllCustomers());
    FetchData();
  };

  // const openInPopup = (item) => {
  //   setRecordForEdit(item);
  //   setOpenPopup(true);
  // };

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const res = await allServices.deleteUser(id);

    FetchData();
    setNotify({
      isOpen: true,
      message: res,
      type: "error",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  return (
    <>
      <PageHeader
        title="User Section"
        subTitle="You want to ADD, UPDATE or DELETE User"
        icon={<PeopleOutlineIcon fontSize="large" />}
      />
      {/* <Controls.Button
        text="Check Selected"
        variant="outlined"
        startIcon={<AddIcon />}
        className={classes.newButton}
        onClick={checkSelected}
      /> */}
      <Paper className={classes.pageContent} elevation={3}>
        <Toolbar>
          <Controls.Input
            label="Search User"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />

          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>

        <TblContainer>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id}>{headCell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {recordsAfterPagingAndSorting().map((item, index) => (
              <TableRow hover key={item.user_name} sx={{ cursor: "pointer" }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.user_id}</TableCell>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.user_email}</TableCell>
                <TableCell>{item.user_mbno}</TableCell>
                <TableCell>
                  <Tooltip
                    title="Edit User"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    arrow
                    placement="top"
                  >
                    <IconButton size="small">
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          openInPopup(item);
                        }}
                      >
                        <ModeEditOutlineOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Delete User"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    arrow
                    placement="top"
                  >
                    <IconButton size="small">
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item.user_id);
                            },
                          });
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            <TblEmptyRows rows={records} />
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      {/* <Popup
        title="Send Mail"
        openPopup={openPopupsendMail}
        setOpenPopup={setopenPopupsendMail}
      >
        <CustomerSendMail recordForSendMail={recordForSendMail} />
      </Popup> */}

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
