import React, { useContext } from "react";
import { DarkModeContext } from "../Context/DarkModeContext";

function Footer() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <>
      <footer
        className={
          darkMode ? "navbar-dark text-light py-3" : "bg-light text-dark py-3"
        }
      >
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h5>About Us</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vel sem non velit scelerisque convallis. Praesent eu justo eu
                massa hendrerit pharetra ac at orci.
              </p>
            </div>
            <div className="col-6 text-md-end">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>
                  Email: <b>onlineshop@gmail.com</b>
                </li>
                <li>
                  Phone: <b>+1234567890</b>
                </li>
                <li>
                  Address: <b>123 Onix, Istog Kosovo</b>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p>
                Copyright © 2023 <b>Amra's Shop</b>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
