import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      <nav className="navbarClass navbar navbar-expand-lg ">
        <ul>
          <Link className="navbarlink" to="/home">
            Home
          </Link>
          <Link className="navbarlink" to="/orders">
            Orders
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
