// Product.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      // Replace this with the actual token you get on login
      const token = localStorage.getItem("token"); 

      const response = await fetch("http://localhost:8080/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex flex-wrap justify-center gap-6 mt-6 px-4">
        {loading && <p className="text-white text-xl mt-10">Loading products...</p>}
        {error && <p className="text-red-500 text-xl mt-10">Error: {error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="text-gray-400 text-xl mt-10">No products found.</p>
        )}

        {!loading &&
          !error &&
          products.map((item) => (
            <Card key={item._id} item={item} />
          ))}
      </div>
    </>
  );
}

export default Product;
