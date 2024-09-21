import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../css/Navbar.css";
//import logo brand img
import Logo from "../assets/fleet.png";
import { Typography } from "@mui/material";

const Navbar = () => {
  //navlink menu array
  // const pages = [
  //   "SIGNIN",
  //   "LEGAL",
  //   "LICENSES",
  //   "Security",
  //   "CAREERS",
  //   "PRESS",
  //   "SUPPORT",
  //   "STATUS",
  //   "CODEBLOG",
  // ];
  // //navlink url array
  // const pageUrl = [
  //   "/signin",
  //   "/legal",
  //   "/licenses",
  //   "/security",
  //   "/careers",
  //   "/press",
  //   "/support",
  //   "/status",
  //   "/codeblog",
  // ];
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-5">
      {/* navbar light is for visibility of collapse icon */}

      {/* brand logo in Link comp instead of a tag*/}
      <div>
        <Link to="/home" className="navbar-brand link_comp">
          <img src={Logo} alt="logo" width="50px" height="50px" />
        </Link>
      </div>

      {/* brand logo in Link comp instead of a tag*/}
      <Link to="/home" className="navbar-brand link_comp"></Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      {/* Each content within this div will collapse and go in hamberger menu in small device */}
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        {/* ____________menu item link start____________________ */}
        {/* Note-
        1. ml-auto=all list menu item go in right
        2. mr-auto=all list menu item go in left
        3. mx-auto=all list menu item go in center */}
        {/* <div>

</div> */}

        <Typography
          variant="h6"
          className="navbar-nav mx-auto"
          style={{ color: "rgba(253, 135, 135, 0.8)" }}
        >
          Alt Mobility : Fleet Management System
        </Typography>
      </div>
    </nav>
  );
};

export default Navbar;
