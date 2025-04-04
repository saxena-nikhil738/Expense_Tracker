import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { pieArcClasses } from "@mui/x-charts/PieChart";
const size = {
  width: 400,
  height: 200,
};
const PiechartAnalytics = (props) => {
  const {
    incomelength,
    expenselength,
    incomelengthstring,
    expenselengthstring,
  } = props;
  let incomepercentage = incomelength / (incomelength + expenselength);
  let expensepercentage = expenselength / (incomelength + expenselength);
  let total = incomelength + expenselength;
  return (
    <div className="">
      <div className="d-flex justify-content-center">
        <span className="m-3 income_class">Income : {incomelengthstring} </span>
        <span className="m-3 expense_class">
          Expense : {expenselengthstring}
        </span>
      </div>
      <PieChart
        series={[
          {
            arcLabel: (item) => ` ${Math.round((item.value / total) * 100)}%`,
            arcLabelMinAngle: 45,
            data: [
              {
                id: 0,
                value: incomelength,
                label: `Income `,
                color: "#4CBB17",
              },
              {
                id: 1,
                value: expenselength,
                label: "Expense",
                color: "#f54e42",
              },
            ],
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30 },
          },
        ]}
        sx={{
          [`& .${pieArcClasses.faded}`]: {
            fill: "gray",
          },
        }}
        width={350}
        height={175}
      />
    </div>
  );
};

export default PiechartAnalytics;
