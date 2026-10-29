
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plantsArray = [
  {
    category: "Aromatic Plants",
    plants: [
      { id: 1, name: "Lavender", cost: 18, image: "photo-1499002238440-d264edd596ec", description: "A fragrant plant with calming aroma." },
      { id: 2, name: "Rosemary", cost: 15, image: "photo-1515586000433-45406d8e6662", description: "An aromatic herb with green needle-like leaves." },
      { id: 3, name: "Jasmine", cost: 20, image: "photo-1490750967868-88aa4486c946", description: "A flowering plant with sweet fragrance." },
      { id: 4, name: "Mint", cost: 10, image: "photo-1501004318641-b39e6451bec6", description: "A refreshing aromatic herb for your home." },
      { id: 5, name: "Lemon Balm", cost: 14, image: "photo-1466692476868-aef1dfb1e735", description: "A lemon-scented herb for indoor gardens." },
      { id: 6, name: "Oregano", cost: 12, image: "photo-1416879595882-3373a0480b5b", description: "A useful culinary herb with a pleasant scent." }
    ]
  },
  {
    category: "Medicinal Plants",
    plants: [
      { id: 7, name: "Aloe Vera", cost: 12, image: "photo-1509423350716-97f9360b4e09", description: "A hardy succulent with thick fleshy leaves." },
      { id: 8, name: "Tulsi", cost: 10, image: "photo-1615485500704-8e990f9900f6", description: "A traditional herb grown in many homes." },
      { id: 9, name: "Neem", cost: 22, image: "photo-1441974231531-c6227db76b6e", description: "A well-known tree valued in traditional practices." },
      { id: 10, name: "Mint Balm", cost: 13, image: "photo-1466692476868-aef1dfb1e735", description: "A leafy herb commonly used in home gardens." },
      { id: 11, name: "Turmeric Plant", cost: 17, image: "photo-1416879595882-3373a0480b5b", description: "A tropical plant known for its rhizomes." },
      { id: 12, name: "Ginger Plant", cost: 16, image: "photo-1501004318641-b39e6451bec6", description: "A tropical herb suitable for a warm growing space." }
    ]
  },
  {
    category: "Air-Purifying Plants",
    plants: [
      { id: 13, name: "Snake Plant", cost: 22, image: "photo-1593691509543-c55fb32e5cee", description: "An easy-care plant with upright leaves." },
      { id: 14, name: "Peace Lily", cost: 24, image: "photo-1494438639946-1ebd1d20bf85", description: "A graceful plant with dark leaves and white blooms." },
      { id: 15, name: "Spider Plant", cost: 16, image: "photo-1459156212016-c812468e2115", description: "A popular plant with arching striped leaves." },
      { id: 16, name: "Areca Palm", cost: 28, image: "photo-1512428813834-c702c7702b78", description: "A tropical palm that adds a lush look." },
      { id: 17, name: "Golden Pothos", cost: 19, image: "photo-1509423350716-97f9360b4e09", description: "A trailing vine with attractive green leaves." },
      { id: 18, name: "Rubber Plant", cost: 26, image: "photo-1501004318641-b39e6451bec6", description: "A decorative plant with broad glossy leaves." }
    ]
  }
];

export function Navbar({ setPage, setShowProductList }) {
  const cart = useSelector((state) => state.cart.items);
  const cartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navigate = (page) => {
    setPage(page);
    if (page === "products") {
      setShowProductList(true);
    }
  };

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => navigate("home")}>
        🌿 Paradise Nursery
      </div>
      <div className="nav-links">
        <button onClick={() => navigate("home")}>Home</button>
        <button onClick={() => navigate("products")}>Plants</button>
        <button onClick={() => navigate("cart")}>
          🛒 Cart ({cartQuantity})
        </button>
      </div>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(
      addItem({
        ...plant,
        image: `https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=700&q=80`
      })
    );
    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true
    }));
  };

  return (
    <main className="page-container">
      <h1 className="section-title">Explore Our Plants</h1>

      {plantsArray.map((category) => (
        <section key={category.category}>
          <h2 className="section-title">{category.category}</h2>

          <div className="product-list">
            {category.plants.map((plant) => (
              <article className="plant-card" key={plant.id}>
                <img
                  src={`https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=700&q=80`}
                  alt={plant.name}
                  loading="lazy"
                />
                <h3>{plant.name}</h3>
                <p className="plant-description">
                  {plant.description}
                </p>
                <p className="plant-price">
                  ${plant.cost.toFixed(2)}
                </p>
                <button
                  className="action-button"
                  disabled={!!addedToCart[plant.name]}
                  onClick={() => handleAddToCart(plant)}
                >
                  {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                </button>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProductList;
