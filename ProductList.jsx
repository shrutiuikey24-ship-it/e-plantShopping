
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  {
    id: 1,
    name: "Lavender",
    category: "Aromatic Plants",
    price: 18,
    description: "A fragrant plant known for its calming aroma.",
    image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Rosemary",
    category: "Aromatic Plants",
    price: 15,
    description: "An aromatic herb with needle-like green leaves.",
    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Aloe Vera",
    category: "Medicinal Plants",
    price: 12,
    description: "A popular succulent with thick, fleshy leaves.",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Tulsi",
    category: "Medicinal Plants",
    price: 10,
    description: "A traditional herb commonly grown in home gardens.",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f6?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Jasmine",
    category: "Aromatic Plants",
    price: 20,
    description: "A flowering plant loved for its sweet fragrance.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Snake Plant",
    category: "Medicinal Plants",
    price: 22,
    description: "A hardy indoor plant with striking upright leaves.",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80"
  }
];

function ProductList() {
  const dispatch = useDispatch();

  const categories = ["Aromatic Plants", "Medicinal Plants"];

  return (
    <main className="page-container">
      <h1 className="section-title">Explore Our Plants</h1>
      <p style={{ textAlign: "center" }}>
        Find the perfect green companion for your home.
      </p>

      {categories.map((category) => (
        <section key={category}>
          <h2 className="section-title">{category}</h2>

          <div className="plant-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <article className="plant-card" key={plant.id}>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                  />

                  <h3>{plant.name}</h3>
                  <p className="plant-description">
                    {plant.description}
                  </p>
                  <p className="plant-price">
                    ${plant.price.toFixed(2)}
                  </p>

                  <button
                    className="action-button"
                    onClick={() => dispatch(addItem(plant))}
                  >
                    Add to Cart
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
