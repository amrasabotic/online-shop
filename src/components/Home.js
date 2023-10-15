import React from "react";
import Footer from "./Footer";
import Main from "./Main";
import Navbar from "./Navbar";
import Header from "./Header";

function Home(props) {
  const slides = [
    {
      url: "https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769",
    },
    {
      url: "https://cdn.shopify.com/s/files/1/1338/0845/collections/blottedlip-lippie-stix_grande.jpg?v=1512588803",
    },
  ];

  return (
    <>
      <Navbar />
      <Header slides={slides} />
      <Main />
      <Footer />
    </>
  );
}
export default Home;
