
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./AboutUs";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand" onClick={() => setPage("home")}>
          🌿 Paradise Nursery
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Plants</button>
          <button onClick={() => setPage("about")}>About Us</button>
          <button
            className="cart-link"
            onClick={() => setPage("cart")}
          >
            🛒 Cart ({totalItems})
          </button>
        </div>
      </nav>

      {page === "home" && (
        <main className="hero">
          <div className="hero-content">
            <h1>Paradise Nursery</h1>
            <h2>Bring Nature Home</h2>
            <p>
              Discover beautiful indoor plants that bring freshness,
              peace, and natural beauty into your living space.
            </p>
            <button
              className="primary-button"
              onClick={() => setPage("products")}
            >
              Get Started
            </button>
          </div>
        </main>
      )}

      {page === "products" && (
        <ProductList />
      )}

      {page === "about" && (
        <AboutUs />
      )}

      {page === "cart" && (
        <CartItem
          onContinueShopping={() => setPage("products")}
        />
      )}

      <footer className="footer">
        <p>© 2026 Paradise Nursery | Grow happiness naturally 🌱</p>
      </footer>
    </div>
  );
}

export default App;
