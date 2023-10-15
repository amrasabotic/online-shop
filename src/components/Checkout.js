import React, { useState, useRef, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../Context/DarkModeContext";
import { ModalContext } from "../Context/ModalContext";
import ModalComponent from "./ModalComponent";

function Checkout() {
  const navigate = useNavigate();

  const { darkMode } = useContext(DarkModeContext);
  const {showModal, message, title, handleButtonClick, closeModal} = useContext(ModalContext)

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    payment: "",
  });
  const [orders, setOrder] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function formData(event) {
    const { name, value } = event.target;
    setUserData((previousValue) => {
      return {
        ...previousValue,
        [name]: value,
      };
    });
  }

  function order(event) {
    event.preventDefault();
    if (
      userData.firstName === "" ||
      userData.lastName === "" ||
      userData.email === "" ||
      userData.phone === "" ||
      userData.address === "" ||
      userData.payment === ""
    ) {
      event.preventDefault();
      handleButtonClick("Required fields!", "All fields are required!");
      // return;
    } else {
      event.preventDefault();

      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      const mergedData = { ...cartData, order: userData };
      setOrder(mergedData);
      localStorage.setItem("order", JSON.stringify(mergedData));
      localStorage.setItem("cart", JSON.stringify([]));
      handleButtonClick(
        "Successfuly ordered!",
        "You have placed your order successfully!"
      );

      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      delay.then(() => navigate("/orders"));
    }
  }

  return (
    <>
      <div className={`${darkMode ? "body-dark" : "navbar-light"}`}>
        <Navbar />
        <br />
        <br />
        <div className="col-sm-12 d-flex align-items-center justify-content-center">
          <form className="form-control-feedback">
            <h3>Checkout Data</h3>
            <div class="form-group mb-2">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={userData.firstName}
                onChange={formData}
                class="form-control"
                ref={inputRef}
              />
            </div>
            <div class="form-group mb-2">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={userData.lastName}
                onChange={formData}
                class="form-control"
              />
            </div>
            <div class="form-group mb-2">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={formData}
                class="form-control"
              />
            </div>
            <div class="form-group mb-2">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={userData.phone}
                onChange={formData}
                class="form-control"
              />
            </div>
            <div class="form-group mb-2">
              <label htmlFor="address">Shipping Address:</label>
              <textarea
                placeholder="Shipping Address"
                name="address"
                value={userData.address}
                onChange={formData}
                class="form-control"
              />
            </div>
            <div class="form-group mb-2">
              <label htmlFor="payment">Choose payment type:</label>
              <br />
              <select
                id="payment"
                name="payment"
                value={userData.payment}
                onChange={formData}
                className="dropdown col-12"
              >
                <option className="disabled">-- Select --</option>
                <option value="cash">Cash</option>
                <option value="card">Credit Card</option>
              </select>
            </div>
            <button className="btn btn-outline-primary mb-2" onClick={order}>
              Order
            </button>
          </form>
        </div>
        <ModalComponent
          title={title}
          message={message}
          showModal={showModal}
          closeModal={closeModal}
        />
      </div>
    </>
  );
}

export default Checkout;
