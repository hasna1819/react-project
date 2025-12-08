// src/pages/SingleProduct.jsx

import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:8080/user/products/single/${id}`);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const data = await res.json();
      setProduct(data.product || data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Couldn't load product. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item._id === product._id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert(`${product.title} added to cart!`);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 animate-pulse p-6">
        <div className="w-full max-w-4xl h-96 rounded-3xl bg-gray-300 shadow-lg" />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <p className="text-xl font-semibold text-red-600">{error}</p>
        <button
          onClick={fetchProduct}
          className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
        >
          Retry
        </button>
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-semibold text-gray-600">
        No product found.
      </div>
    );

  const { image, title, description, price, category, _id } = product;

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-20 px-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <div className="relative max-w-4xl w-full bg-white/80 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 transition-transform hover:scale-[1.01] duration-500">
        
        {/* Left: Image */}
        <div className="flex-1 relative w-full md:w-1/2 h-96 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-700 transform hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 pointer-events-none rounded-2xl" />
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-lg">
            {title}
          </h1>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            {description || "No description available."}
          </p>

          <p className="text-3xl font-bold text-indigo-600 mt-4">
            ₹{price}
          </p>

          <p className="text-gray-500 text-lg">
            Category: <span className="font-semibold text-gray-800">{category?.title || "No Category"}</span>
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
       <Link
              to={`/Proceed`}
              className="text-indigo-600 underline font-medium self-start"
            >
              Add to cart
            </Link>
            

        
          </div>
        </div>

        {/* Floating glow effect */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-20 blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SingleProduct;
