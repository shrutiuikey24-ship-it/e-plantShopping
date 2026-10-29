
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity
} from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  };

  const handleDecrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.cost * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Checkout is Coming Soon!");
  };

  return (
    <main className="cart-container">
      <h1 className="section-title">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty 🌱</h2>
          <p>Add some beautiful plants to get started.</p>
          <button
            className="get-started-button"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <article className="cart-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Unit Cost: ${item.cost.toFixed(2)}</p>
                <p>
                  Total Cost: $
                  {(item.cost * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="quantity-controls">
                <button
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </article>
          ))}

          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>

            <button
              className="get-started-button"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>

            {" "}

            <button
              className="action-button"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default CartItem;
