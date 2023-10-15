import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../Context/DarkModeContext";

function Cart() {
  const { darkMode } = useContext(DarkModeContext);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartProducts, setCartProducts] = useState(cart); //products in cart
  const [totalPrice, setTotalPrice] = useState(0);

  //To decrease number of product in cart
  const handleDecrement = (cart_id) => {
    setCartProducts((cartProducts) =>
      cartProducts.map((item) =>
        cart_id === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
  };
  localStorage.setItem("cart", JSON.stringify(cartProducts));

  //To increment number of products in cart
  const handleIncrement = (cart_id) => {
    setCartProducts((cartProducts) =>
      cartProducts.map((item) =>
        cart_id === item.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const remove = (item) => {
    const updatedCartItems = cartProducts.filter(
      (cartItem) => cartItem !== item
    );
    setCartProducts(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  //To empty cart
  const emptyCart = () => {
    setCartProducts([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  //Calculating total for all products in cart
  useEffect(() => {
    let totalPrice = 0;
    cartProducts.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  }, [cartProducts]);

  //showing data from cart
  const productsFromCart = cartProducts.map((item) => {
    return (
      <tr key={item.id}>
        <td>
          <img src={item.image_link} className="cart-img" />
        </td>
        <td>{item.name}</td>
        <td> {item.price}</td>
        <td>
          <div className="quantity-control">
            <button
              className="quantity-btn"
              type="button"
              onClick={() => handleDecrement(item.id)}
            >
              {" "}
              -{" "}
            </button>
            <div className="quantity-value">{item.quantity}</div>
            <button
              className="quantity-btn"
              type="button"
              onClick={() => handleIncrement(item.id)}
            >
              {" "}
              +{" "}
            </button>
          </div>
        </td>
        <td>{(item.quantity * item.price).toFixed(2)} &euro;</td>
        <td>
          <button
            type="button"
            onClick={() => remove(item)}
            className="btn btn-outline-danger"
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  const style = {
    color: "white",
  };

  const btn_style = {
    marginRight: "30px",
  };

  return (
    <div className={`vh-100 ${darkMode ? "body-dark" : "navbar-light"}`}>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <br />
        <h4 className="text-center">Your shopping cart</h4>
        <br />
        <table
          className={`${
            darkMode ? "table table-success" : "table table-striped"
          }`}
        >
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{productsFromCart}</tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total:</td>
              <td>{totalPrice.toFixed(2)} &euro;</td>
              <td>
                <button
                  type="button"
                  onClick={emptyCart}
                  className="btn btn-danger"
                >
                  Empty Cart
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout-buttons">
          <button type="button" className="btn btn-success" style={btn_style}>
            <Link to="/products" style={style}>
              Shop Now
            </Link>
          </button>
          <button
            type="button"
            className={
              totalPrice === 0 ? "btn btn-secondary disabled" : "btn btn-info"
            }
          >
            <Link to={totalPrice === 0 ? "/cart" : "/checkout"} style={style}>
              Checkout
            </Link>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Cart;
