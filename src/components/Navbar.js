import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo1.png";
import { DarkModeContext } from "../Context/DarkModeContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav className={`navbar ${darkMode ? "navbar-dark" : "navbar-light"}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} className="logo" />
        </Link>
        <span className="navbar-text">Amra's Shop</span>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
      </div>
      <div className="navbar-toggle">
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round" onClick={toggleDarkMode}></span>
        </label>
      </div>
    </nav>
  );
}

export default Navbar;
