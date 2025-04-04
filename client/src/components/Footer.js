import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <MDBFooter
      color="white"
      bgColor="dark"
      className="text-center mx-2 text-lg-start footer_section mt-5 mb-1"
    >
      <section className="d-flex justify-content-center  p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on :</span>
        </div>

        <div>
          <Link to="" aria-label="facebook" className="me-4 text-reset">
            <FacebookIcon />
          </Link>
          <Link to="" aria-label="instagram" className="me-4 text-reset">
            <InstagramIcon />
          </Link>
          <Link to="" aria-label="Twitter" className="me-4 text-reset">
            <TwitterIcon />
          </Link>
        </div>
      </section>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <Link className="text-white text-decoration-none">
          ExpenseTracker806.com
        </Link>
      </div>
    </MDBFooter>
  );
}
