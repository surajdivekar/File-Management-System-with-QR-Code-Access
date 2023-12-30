import React, { useState } from "react";

import Table from "@mui/material/Table";

import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Checkbox,
  IconButton,
  Toolbar,
  Typography,
  alpha,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
    "& thead th": {
      fontWeight: "600",
      // color: theme.palette.primary.main,
      color: "black",
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

export default function useTable(records, headCells, filterFn) {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [dense, setDense] = React.useState(false);

  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = (props) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selected, setSelected] = useState([]);

    const numSelected = props.numSelected;
    const rowCount = props.rowCount;
    const data = props.data;
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    const handleSelectAllClick = (event) => {
      setSelectAll(event.target.checked);
      const newSelected = event.target.checked
        ? records.map((n) => n.name)
        : [];
      setSelected(newSelected);
      // console.log(selected);
    };

    return (
      <>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              {/* <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick}
                inputProps={{
                  "aria-label": "select all customers",
                }}
              /> */}
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={selectAll}
                onChange={handleSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.disableSorting ? (
                  headCell.label
                ) : (
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => {
                      handleSortRequest(headCell.id);
                    }}
                  >
                    {headCell.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const TblEmptyRows = (props) => {
    const rows = props.rows;
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    return (
      <>
        {emptyRows > 0 && (
          <TableRow
            style={{
              height: (dense ? 33 : 53) * emptyRows,
            }}
          >
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </>
    );
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  function EnhancedTableToolbar(props) {
    const { numSelected, tableTitle } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
        // sx={{ display: "flex", justifyContent: "flex-end" }}
        style={{ marginBottom: "-30px", justifyContent: "flex-start" }}
      >
        {/* {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} Selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {tableTitle}
          </Typography>
        )} */}
        <Typography
          // sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Selected
        </Typography>

        {/* <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography> */}
      </Toolbar>
    );
  }

  // EnhancedTableToolbar.propTypes = {
  //   numSelected: PropTypes.number.isRequired,
  // };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    TblEmptyRows,
    EnhancedTableToolbar,
    recordsAfterPagingAndSorting,
  };
}
