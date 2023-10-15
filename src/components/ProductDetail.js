import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { DarkModeContext } from "../Context/DarkModeContext";
import { ModalContext } from "../Context/ModalContext";
import ModalComponent from "./ModalComponent";

function ProductDetail() {
  const { darkMode } = useContext(DarkModeContext);
  const {showModal, message, title, handleButtonClick, closeModal} = useContext(ModalContext)
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://makeup-api.herokuapp.com/api/v1/products/${productId}.json`
      );
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = (product) => {
    const existingProducts = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingProducts.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      const updatedCartItems = [...existingProducts];
      updatedCartItems[existingItemIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      handleButtonClick(
        "Added in Cart!!",
        "You have added product successfully in the cart!"
      );
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...existingProducts, { ...product, quantity: 1 }])
      );
      handleButtonClick(
        "Added in Cart!!",
        "You have added product successfully in the cart!"
      );
    }
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <div className={`vh-100 ${darkMode ? "body-dark" : "navbar-light"}`}>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>{product.name}</h1>
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-6 col-md-6 col-lg-6 col-12">
            <img src={product.image_link} alt={product.name} />
          </div>
          <div className="col-6 col-md-6 col-lg-6 col-12">
            <p>{product.description}</p>
            <p>
              Price: <b>{product.price} &euro;</b>
            </p>
            <p>
              Brand: <b>{product.brand}</b>
            </p>
            <p>
              Product Type: <b>{product.product_type}</b>
            </p>
            <button
              onClick={() => addToCart(product)}
              className="btn btn-success"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <ModalComponent
        title={title}
        message={message}
        showModal={showModal}
        closeModal={closeModal}
      />
    </div>
  );
}

export default ProductDetail;
