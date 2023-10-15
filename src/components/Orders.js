import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { DarkModeContext } from "../Context/DarkModeContext";

function Orders() {
  const { darkMode } = useContext(DarkModeContext);

  const orders = JSON.parse(localStorage.getItem("order")) || [];
  const [orderedProducts, setOrderedProducts] = useState(orders);

  const dataArray = Object.entries(orderedProducts).map(([key, value]) => ({
    key,
    ...value,
  }));

  const dataTable = dataArray.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.product_type}</td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
      <td>{(item.quantity * item.price).toFixed(2)}</td>
    </tr>
  ));

  return (
    <div className={`${darkMode ? "body-dark" : "navbar-light"}`}>
      <Navbar />
      <br></br>
      <br />
      <div className="container">
        {Object.keys(orderedProducts).length === 0 ? (
          <p>You don't have any order</p>
        ) : (
          <div className="row">
            <div className="col-12 text-center">
              <h3>Your orders</h3>
            </div>
            <br />
            <br />
            <br />
            <div
              className={`${
                darkMode
                  ? "col-lg-6 col-sm-12 card text-dark"
                  : "col-lg-6 col-sm-12 card"
              }`}
            >
              <h5 className="text-center">Your shipping data </h5>
              <p>
                Full Name:{" "}
                <b>
                  {orderedProducts.order.firstName}{" "}
                  {orderedProducts.order.lastName}
                </b>
              </p>
              <p>
                Email Address: <b>{orderedProducts.order.email}</b>
              </p>
              <p>
                Phone: <b>{orderedProducts.order.phone}</b>
              </p>
              <p>
                Shipping Address: <b>{orderedProducts.order.address}</b>
              </p>
              <p>
                Payment method: <b>{orderedProducts.order.payment}</b>
              </p>
            </div>
            <div className="col-lg-6 col-sm-12">
              <h5 className="text-center">Ordered Products</h5>
              <table
                className={
                  darkMode ? "table table-light" : "table table-striped"
                }
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Product Type</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>{dataTable}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Orders;
