import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { tableCellClasses } from "@mui/material/TableCell";
import { Button } from "@mui/material";
import { Form, Input, message, Modal, Select, DatePicker } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TransactionTable({ columns, rows }) {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [refresh, setRefresh] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("/api/v1/transactions/edit-transaction", {
        date,
        amount,
        type,
        category,
        reference,
        description,
        userid: user._id,
        transacationId: id,
      });

      toast.success("Transaction edited Successfully", {
        position: "top-center",
      });
      setRefresh(false);
      setShowModal(false);
    } catch (error) {
      toast.error("Faild to edit transection", { position: "top-center" });
    }
  };

  const handleUpdate = (id) => {
    const result = rows.filter((row) => row._id === id);
    console.log(result);
    setShowModal(true);

    setAmount(result[0].amount);
    const dateconverted = new Date(result[0].date);

    // console.log(date1.toLocaleDateString());
    // var date2 = date1.toLocaleDateString();
    // var date3 = date2.split("/").join("-");
    // console.log(date3);
    setDate(result[0].date);
    setId(id);
    setAmount(result[0].amount);
    setCategory(result[0].category);
    setType(result[0].type);
    setReference(result[0].reference);
    setDescription(result[0].description);
  };
  const handleDelete = async (id) => {
    try {
      await axios.post("/api/v1/transactions/delete-transaction", {
        transacationId: id,
      });
      toast.success("Transaction Deleted!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);

      toast.error("unable to delete", {
        position: "top-center",
      });
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.title}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                    >
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {moment(row.date).format("DD-MM-YYYY")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {/* {row.amount} */}
                        {row.amount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </StyledTableCell>
                      <StyledTableCell
                        className="text-capitalize"
                        align="center"
                      >
                        {row.type}
                      </StyledTableCell>
                      <StyledTableCell
                        className="text-capitalize"
                        align="center"
                      >
                        {row.category}
                      </StyledTableCell>
                      <StyledTableCell
                        className="text-capitalize"
                        align="center"
                      >
                        {row.reference}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <BootstrapTooltip title="Edit">
                          <Button onClick={() => handleUpdate(row._id)}>
                            {/* <Button onClick={() => removeCartItem(row._id)}> */}
                            <EditIcon
                              fontSize="medium"
                              style={{ color: "blue" }}
                            />
                          </Button>
                        </BootstrapTooltip>
                        <BootstrapTooltip title="Delete">
                          <Button>
                            <DeleteIcon
                              onClick={() => handleDelete(row._id)}
                              fontSize="medium"
                              style={{ color: "red" }}
                            />
                          </Button>
                        </BootstrapTooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        title="Edit Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label className="mb-2">Amount</label>
            <Input
              required
              type="text"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">Type</label>
            <Select
              className="w-100"
              required
              value={type}
              onChange={(e) => {
                setType(e);
              }}
            >
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
          <div className="mb-3">
            <label className="mb-2">Category</label>
            <Select
              className="w-100"
              required
              value={category}
              onChange={(e) => {
                setCategory(e);
              }}
            >
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </div>
          <div className="mb-3">
            <label className="mb-2">Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">Reference</label>
            <Input
              required
              type="text"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">Description</label>
            <Input
              required
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </form>
        {/* <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input
              required
              type="text"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select
              required
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select
              required
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input
              required
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input
              required
              type="text"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input
              required
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form> */}
      </Modal>
    </>
  );
}
