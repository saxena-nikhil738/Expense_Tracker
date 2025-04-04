import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { pieArcClasses } from "@mui/x-charts/PieChart";
import PiechartAnalytics from "./PiechartAnalytics";
import { Progress } from "antd";
const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center ">
          <div className="m-3 p-2 col-md-4 rounded border border-warning">
            <h5 className="mt-2">No. of Transactions</h5>
            <PiechartAnalytics
              incomelength={totalIncomeTransactions.length}
              expenselength={totalExpenseTransactions.length}
              incomelengthstring={totalIncomeTransactions.length}
              expenselengthstring={totalExpenseTransactions.length}
            />
          </div>
          <div className="m-3 p-2 col-md-4 rounded border border-warning ">
            <h5 className="mt-2">Transaction Turnover</h5>
            <PiechartAnalytics
              incomelength={totalIncomeTurnover}
              incomelengthstring={totalIncomeTurnover.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
              expenselength={totalExpenseTurnover}
              expenselengthstring={totalExpenseTurnover.toLocaleString(
                "en-IN",
                {
                  style: "currency",
                  currency: "INR",
                }
              )}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center ">
          <div className="col-md-4 m-3 rounded border border-warning p-4">
            <h5 className="text-center income_class mb-3">
              Categorywise Income
            </h5>
            {categories.map((category) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card">
                    <div className="card-body">
                      <span className="text-capitalize">{category}</span>
                      <Progress
                        percent={((amount / totalIncomeTurnover) * 100).toFixed(
                          0
                        )}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className="col-md-4 m-3 rounded border border-warning p-4">
            <h5 className="text-center expense_class mb-3">
              Categorywise Expense
            </h5>
            {categories.map((category) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div className="card">
                    <div className="card-body">
                      <span className="text-capitalize">{category}</span>
                      <Progress
                        percent={(
                          (amount / totalExpenseTurnover) *
                          100
                        ).toFixed(0)}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4"></div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
