import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Table, DatePicker, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import TransactionTable from "../components/TransactionTable";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListIcon from "@mui/icons-material/List";
import Analytics from "../components/Analytics";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Footer from "../components/Footer";

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
const { RangePicker } = DatePicker;
const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  //table data
  const columns = [
    {
      title: "#",
      dataIndex: "slno",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
    },
  ];

  //getall transactions

  // useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await axios.post("/api/v1/transactions/get-transaction", {
          userid: user._id,
          selectedDate,
          frequency,
          type,
        });

        setAllTransaction(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Fetch Issue With Transaction", {
          position: "top-center",
        });
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  // form handling
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("/api/v1/transactions/add-transaction", {
        ...values,
        userid: user._id,
      });
      toast.success("Transaction Added Successfully", {
        position: "top-center",
      });

      setShowModal(false);
    } catch (error) {
      setLoading(false);
      toast.error("Faild to add transaction", { position: "top-center" });
    }
  };
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  var netIncome1 = totalIncomeTurnover - totalExpenseTurnover;
  var netIncome = netIncome1.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return (
    <>
      <div className="container text-center mb-5 ml-2 mr-2 ">
        <div className="filters row mt-5">
          <div className="col-md-3 mt-4">
            <h6>Select Date Range</h6>

            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">last 1 Week</Select.Option>
              <Select.Option value="30">last 1 Month</Select.Option>
              <Select.Option value="365">last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedate(values)}
              />
            )}
          </div>
          <div className="col-md-3 mt-4">
            <h6>Select Type</h6>
            <Select
              className="w-50"
              value={type}
              onChange={(values) => setType(values)}
            >
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
          </div>
          <div className="col-md-3 mt-4 d-flex justify-content-center ">
            <div className="switch-icons w-50  ">
              <BootstrapTooltip title="Table View">
                <ListIcon
                  fontSize="large"
                  className={`mt-icons ${
                    viewData === "analytics" ? "active-icon" : "inactive-icon"
                  }`}
                  onClick={() => setViewData("analytics")}
                />
              </BootstrapTooltip>
              <BootstrapTooltip title="Analytics">
                <AnalyticsIcon
                  className={`mt-icons  ${
                    viewData === "table" ? "active-icon" : "inactive-icon"
                  }`}
                  fontSize="large"
                  onClick={() => setViewData("table")}
                />
              </BootstrapTooltip>
            </div>
          </div>
          <div className="col-md-3 mt-4 ">
            <button
              className="btn btn-primary "
              onClick={() => setShowModal(true)}
            >
              Add New Transaction
            </button>
          </div>
        </div>
        <div>
          {allTransaction?.length > 0 ? (
            ""
          ) : (
            <div className="mt-5 text-danger">
              <h1>No Transactions</h1>
            </div>
          )}
        </div>
        {netIncome1 > 0 ? (
          <div className="mx-auto mt-5 col-md-8 p-3 text-success rounded border border-warning">
            <h1>{`Savings : ${netIncome}`}</h1>
          </div>
        ) : (
          <div className="mx-auto mt-5 col-md-8 p-3 text-danger rounded border border-warning">
            <h1>{`Savings : ${netIncome}`}</h1>
          </div>
        )}

        <div className="content ">
          <div className="mt-5 table_marigin">
            {viewData !== "table" ? (
              <TransactionTable columns={columns} rows={allTransaction} />
            ) : (
              <Analytics allTransaction={allTransaction} />
            )}
          </div>
          {/* <Table columns={columns} dataSource={allTransection} /> */}
        </div>
        <Modal
          title="Add Transaction"
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Amount" name="amount">
              <Input required type="text" />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select required>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select required>
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
              <Input required type="date" />
            </Form.Item>
            <Form.Item label="Reference" name="reference">
              <Input required type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input required type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                SAVE
              </button>
            </div>
          </Form>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
