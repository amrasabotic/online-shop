import { Link } from "react-router-dom";
import React, { useState, useEffect, useMemo, useContext } from "react";
import ReactPaginate from "react-paginate";
import { DarkModeContext } from "../Context/DarkModeContext";

function Main() {
  const { darkMode } = useContext(DarkModeContext);

  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const defaultImgSrc =
    "https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769";

  const productsPerPage = 12;
  const pagesVisited = pageNumber * productsPerPage;

  useEffect(function () {
    fetch(
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleImageError = (event) => {
    event.target.src = defaultImgSrc;
  };

  const styles = {
    margin: "20px",
  };

  const displayProducts = useMemo(() => {
    return products
      .slice(pagesVisited, pagesVisited + productsPerPage)
      .map((item) => {
        return (
          <Link
            key={item.id}
            to={`/products/${item.id}`}
            className="col-sm-6 col-md-4 col-lg-3 col-12"
          >
            <div className="card mb-2 md-12" style={styles}>
              <div className="col-sm-12 mx-auto text-center">
                <img
                  src={item.image_link}
                  onError={handleImageError}
                  alt="Product"
                  className="img-fluid"
                />
              </div>
              <div className="card-body">
                <h6 className="text-black">{item.name}</h6>
                <p className="text-muted">{item.price} &euro;</p>

                <button className="btn btn-success">Add to Cart</button>
              </div>
            </div>
          </Link>
        );
      });
  });

  function changePage({ selected }) {
    setPageNumber(selected);
  }

  const pageCount = Math.ceil(products.length / productsPerPage);

  return (
    <div className={`${darkMode ? "body-dark" : "navbar-light"}`}>
      <br />
      <br />
      <h2 className="text-center">Available Products</h2>
      <div className="container">
        <div className="d-flex flex-wrap">{displayProducts}</div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          activeClassName={"paginationActive "}
        />
      </div>
    </div>
  );
}

export default Main;
