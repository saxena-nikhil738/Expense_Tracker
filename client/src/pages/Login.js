import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MainHeader from "../components/MainHeader";

const Login = () => {
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const paperStyle = { padding: "30px 20px", width: 340, margin: "20px auto" };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const res = await axios.post(`/api/v1/users/login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success("login successfull", { position: "top-center" });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data.user, password: "" })
        );
        navigate("/");
      } else {
        toast.error(res?.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or password", {
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <>
      <MainHeader />
      {/* <div className="mx-auto my-auto"> */}
      <Paper elevation={20} style={paperStyle} className="lr_page">
        <div
          className="d-flex flex-column
align-items-center"
        >
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Sign In</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextField
              required
              id="email"
              label="Email"
              variant="standard"
              value={email}
              fullWidth
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <TextField
              required
              type="password"
              id="password"
              label="password"
              variant="standard"
              value={password}
              fullWidth
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" color="primary" variant="contained">
            Login
          </Button>
          <div className="d-flex justify-content-between mt-3 text-primary">
            <Link className="nav-link " to="/register">
              Not Registered ? Click here to Register
            </Link>
          </div>
          <div className="col-md-6 mt-2">
            <small className="forgot_password">
              <span
                className="text-warning "
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password
              </span>
            </small>
          </div>
        </form>
      </Paper>
      {/* </div> */}
    </>
  );
};

export default Login;
