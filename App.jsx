
import React, { useState } from "react";
import ProductList, { Navbar } from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
    setPage("products");
  };

  return (
    <div className="app">
      <Navbar
        setPage={setPage}
        setShowProductList={setShowProductList}
      />

      {page === "home" && (
        <main className="background-image">
          <div className="hero-content">
            <h1>Welcome to Paradise Nursery</h1>
            <h2>Bring Nature Home</h2>
            <p>
              Discover beautiful indoor plants that bring freshness,
              peace, and natural beauty into your living space.
            </p>
            <button
              className="get-started-button"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </main>
      )}

      {page === "products" && showProductList && (
        <ProductList />
      )}

      {page === "about" && <AboutUs />}

      {page === "cart" && (
        <CartItem
          onContinueShopping={() => {
            setShowProductList(true);
            setPage("products");
          }}
        />
      )}

      <footer className="footer">
        <p>© 2026 Paradise Nursery | Grow happiness naturally 🌱</p>
      </footer>
    </div>
  );
}

export default App;
