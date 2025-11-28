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
      if (!id) {
        setError("Product ID was not provided.");
        return;
      }

      const res = await fetch(`http://localhost:8080/user/products/single/${id}`);
      if (!res.ok) throw new Error(`Server responded with status ${res.status}`);

      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Something went wrong while loading the product.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center animate-pulse min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <div className="w-72 h-72 bg-gray-300 rounded-2xl mb-6" />
        <div className="w-56 h-6 bg-gray-300 rounded mb-2" />
        <div className="w-64 h-4 bg-gray-300 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-xl text-red-600 font-semibold flex flex-col items-center min-h-screen justify-center">
        {error}
        <button
          onClick={fetchProduct}
          className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 rounded-2xl text-white font-semibold hover:scale-105 hover:shadow-lg transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-10 text-xl text-red-600 font-semibold flex items-center justify-center min-h-screen">
        No product found.
      </div>
    );
  }

  const { image, title, description, price, category } = product;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 flex justify-center items-start py-16 px-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg flex flex-col items-center transition-transform duration-500 hover:-translate-y-2 hover:shadow-3xl">
        
        {/* Floating Glow Effect */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-20 blur-3xl pointer-events-none"></div>

        {/* Product Image */}
        <div className="relative w-72 h-72 mb-6 rounded-2xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-700 transform hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 hover:opacity-30 transition-opacity duration-500"></div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center tracking-wide">
          {title}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg mb-6 text-center leading-relaxed">
          {description || "No description available."}
        </p>

        {/* Price */}
        <p className="text-3xl font-bold text-indigo-600 mb-2 drop-shadow-lg">
          ₹{price}
        </p>

        {/* Category */}
        <p className="text-gray-500 mb-6">
          Category: {category?.title ?? "No Category"}
        </p>

        {/* Back Button */}
        <Link
          to={`/productdetails/${category?._id || ""}`}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          Back to Category
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;