import React from "react";

const HeroesRight = ({ paragraph1, img1, heading1 }) => {
  return (
    <div className="container my-5  p-2">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 mt-5">
          <img
            // height="250"
            // width="400"
            className=" shadow-lg responsive  bg-white rounded img_hero"
            src={img1}
          />
        </div>
        <div className="col-md-4">
          <div className="p-3 mt-4">
            <h3 className=" mb-4 hero_heading">{heading1}</h3>
            <p className="">{paragraph1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroesRight;
