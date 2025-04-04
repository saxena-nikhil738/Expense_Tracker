import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import Button from "@mui/material/Button";

import axios from "axios";

// import Avatar from "@mui/material/Avatar";

const MainHeader = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setLoginUser("");
    toast.success("Logout successfull", { position: "top-center" });
    navigate("/");
  };
  return (
    <>
      <nav className="navbar p-2 navbar-expand-lg text-white sticky bg-body-tertiary navabar_css">
        <div className="container">
          <NavLink to="/" className="navbar-brand hero_heading">
            Expense Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto   mb-2 mb-lg-0">
              <li className="nav-item mt-1">
                <NavLink to="/" className="nav-link " aria-current="page">
                  Home
                </NavLink>
              </li>
              {loginUser ? (
                <li className="nav-item mt-1">
                  <NavLink
                    to="/dashboard"
                    className="nav-link "
                    aria-current="page"
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              <li className="nav-item nav-link mt-1 text-primary ">
                {loginUser && loginUser.name}
              </li>
              {!loginUser ? (
                <>
                  <li className="nav-item nav-link">
                    <Button
                      className=" ml-5"
                      onClick={() => {
                        navigate("/login");
                      }}
                      variant="outlined"
                    >
                      Login
                    </Button>
                  </li>
                  <li className="nav-item nav-link">
                    <Button
                      className=" ml-5"
                      onClick={() => {
                        navigate("/register");
                      }}
                      variant="contained"
                    >
                      Register
                    </Button>
                  </li>
                </>
              ) : (
                <li className="nav-item nav-link">
                  <Button
                    className=" ml-5"
                    onClick={() => {
                      logoutHandler();
                    }}
                    variant="contained"
                  >
                    Logout
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainHeader;
