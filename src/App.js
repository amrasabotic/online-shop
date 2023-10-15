import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import Main from "./components/Main";
import Orders from "./components/Orders";
import { DarkModeProvider } from "./Context/DarkModeContext";
import { ModalProvider } from "./Context/ModalContext";

function App() {
  return (
    <>
      <br />
      <br />
      <br />
      <ModalProvider>
        <DarkModeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </DarkModeProvider>
      </ModalProvider>
    </>
  );
}

export default App;
