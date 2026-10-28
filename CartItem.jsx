
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity
} from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (items.length === 0) {
      alert("Your cart is empty. Add some plants first!");
      return;
    }

    alert(
      `Thank you for shopping at Paradise Nursery!\nYour total is $${total.toFixed(2)}.`
    );
  };

  return (
    <main className="page-container">
      <h1 className="section-title">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty 🌱</h2>
          <p>Discover your favourite plants and bring nature home.</p>
          <button
            className="action-button"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <article className="cart-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Unit price: ${item.price.toFixed(2)}</p>
                <p>
                  Subtotal: $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="quantity-controls">
                <button
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1
                      })
                    )
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1
                      })
                    )
                  }
                >
                  +
                </button>
              </div>

              <button
                className="delete-button"
                onClick={() => dispatch(removeItem(item.id))}
              >
                Delete
              </button>
            </article>
          ))}

          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>

            <button
              className="action-button"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>

            {" "}

            <button
              className="action-button"
              onClick={checkout}
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
