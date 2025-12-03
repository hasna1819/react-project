// src/pages/ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const PRODUCT_API = `http://localhost:8080/products/${id}`;

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(PRODUCT_API);
      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();

      // Backend may return object or array — normalize it
      setProduct(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading)
    return <div className="p-10 text-xl text-center">Loading...</div>;

  if (!product)
    return (
      <div className="p-10 text-xl text-center text-red-500">
        Product not found
      </div>
    );

  const { title, image, price, description } = product;

  return (
    <div className="p-10 flex justify-center items-center min-h-screen bg-[#0f0f0f]">

      <div
        className="
          w-full max-w-sm
          bg-white/10 backdrop-blur-xl 
          border border-gray-700 
          rounded-2xl 
          shadow-2xl shadow-black/40 
          p-6
          text-black
          transition-all 
          duration-500 
          hover:scale-[1.02]
        "
      >
        
        <h1 className="text-2xl font-bold mb-4 text-center tracking-wide text-[#D4AF37]">
          {title}
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={image}
            alt={title}
            className="
              w-40 h-40 object-contain 
              rounded-xl 
              shadow-lg shadow-black/40 
              border border-gray-700 
              hover:scale-105 transition-transform duration-300
            "
          />
        </div>

        <p className="text-xl text-center mt-3 text-[#F2DFA7]">
          <strong className="text-[#D4AF37]">Price: </strong> ₹{price}
        </p>

        <p className="text-sm leading-relaxed text-gray-200 text-center">
          {description || "No description available."}
        </p>

        {/* LINK TO SINGLE PRODUCT */}
        <Link
          to={`/SingleProduct/${product._id || product.id}`}
          className="
            block text-center
            w-full 
            mt-6 py-3 
            text-lg font-semibold 
            rounded-xl 
            bg-gradient-to-r from-[#D4AF37] to-[#b8962e] 
            text-black
            shadow-lg shadow-black/50 
            border border-yellow-700 
            transition-all duration-300 
            hover:shadow-yellow-500/50 
            hover:shadow-2xl
            hover:-translate-y-1
            hover:from-[#f1d67c] hover:to-[#D4AF37]
            active:scale-95
          "
        >
          View Full Details
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
