import { Paper } from "@mui/material";
import React from "react";

const Heroes = ({ paragraph1, img1, heading1 }) => {
  return (
    // <div className="container">
    //   <div className="row d-flex justify-content-center border mt-5">
    //     <div className="col-md-4 mt-3  p-3">
    //       <img src="/Turnover_img.jpg" height="250px"></img>
    //     </div>

    //     <div className="col-md-4  d-flex flex-column  justify-content-center align-items-start">
    //       <h3>Total Turnover</h3>
    //       <p className="mt-3">
    //         It takes to seconds to add transaction and Put them into clear and
    //         visualized categories such as Income and Expense .
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="container my-5  p-2">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="p-3 mt-4">
            <h3 className=" mb-4 hero_heading">{heading1}</h3>
            <p className="">{paragraph1}</p>
          </div>
        </div>
        <div className="col-md-4">
          <img
            // height="250"
            // width="400"
            className=" shadow-lg responsive  bg-white rounded img_hero"
            src={img1}
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
