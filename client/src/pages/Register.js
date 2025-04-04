import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import MainHeader from "../components/MainHeader";

const Register = () => {
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const paperStyle = { padding: "30px 20px", width: 340, margin: "20px auto" };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [otpform, setOtpForm] = useState(true);
  const navigate = useNavigate();

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    try {
      let code = otp;
      const res = await axios.post(`/api/v1/users/register`, {
        code,
        name,
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success("registered successfully", { position: "top-center" });
        navigate("/login");
      }
      //   if (res && res.data.success) {
      //     toast.success("otp sent successfully", { position: "top-center" });
      //   }
      else {
        toast.error("Invalid otp", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password", { position: "top-center" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/users/register-otp`, {
        name,
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success("otp sent successfully", { position: "top-center" });
        setOtpForm(false);
      } else {
        toast.error(res?.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { position: "top-center" });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <MainHeader />
      {/* <div className="registration"> */}
      <Paper elevation={20} style={paperStyle} className="lr_page">
        <div
          className="d-flex flex-column
align-items-center"
        >
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
        </div>
        {otpform ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <TextField
                required
                id="name"
                label="Name"
                variant="standard"
                value={name}
                fullWidth
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              Sign up
            </Button>
            <div className="d-flex justify-content-between mt-3 text-primary">
              <Link className="nav-link " to="/login">
                Already Registered ? Click here to login
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit}>
            <div className="mt-5 ">
              <TextField
                required
                id="otp"
                label="OTP"
                variant="standard"
                value={otp}
                fullWidth
                placeholder="Enter OTP"
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>

            <Button
              className="mt-5"
              type="submit"
              color="primary"
              variant="contained"
            >
              submit
            </Button>
          </form>
        )}
      </Paper>
      {/* </div> */}
    </>
  );
};

export default Register;
