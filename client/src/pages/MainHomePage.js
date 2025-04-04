import React from "react";
import Header from "../components/Header";
import MainHeader from "../components/MainHeader";
import Heroes from "../components/Heroes";
import HeroesRight from "../components/HeroesRight";
import Footer from "../components/Footer";

const MainHomePage = () => {
  const paragraph1 =
    "It takes  seconds to add daily transaction and Put them into clear and visualized categories such as Income and Expense .";

  const paragraph2 =
    "It takes seconds to add daily transactions. Put them into clear and visualized categories such as Income : Salary , Project ,Tips .";

  const paragraph3 =
    "It takes seconds to add daily transactions. Put them into clear and visualized categories such as Expense: food , movies , bills , medical , fee etc .";

  const paragraph4 =
    "It takes seconds to add daily transactions. Put them into tabular format and can edit and delete transactions .";

  const heading1 = "Total Turnover";
  const heading2 = "Categorywise Income";
  const heading3 = "Categorywise Expense";
  return (
    <div>
      <MainHeader />
      <div className="conatainer  ">
        <div className="main_heading mt-5 text-center">
          <h1 className="hero_heading">Simple way</h1>
          <h1 className="mt-2 hero_heading">
            to manage your <span className="text-success">Income</span> and
            <span className="expense_class"> Expenses</span>
          </h1>
          <div className="hero_div">
            <Heroes
              paragraph1={paragraph1}
              img1="/Turnover_img.jpg"
              heading1={heading1}
            />
          </div>
          <div className="hero_div">
            <HeroesRight
              paragraph1={paragraph2}
              img1="/category_income_img.jpg"
              heading1={heading2}
            />
          </div>
          <div className="hero_div">
            <Heroes
              paragraph1={paragraph3}
              img1="/category_expense.jpg"
              heading1={heading3}
            />
          </div>
          <div className="hero_div">
            <HeroesRight
              paragraph1={paragraph4}
              img1="/table_form.jpg"
              heading1="Tabular View"
            />
          </div>
        </div>
      </div>
      <div className="footer_css">
        <Footer />
      </div>
    </div>
  );
};

export default MainHomePage;
