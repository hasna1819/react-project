import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useCartStore from "../CartStore";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For programmatic navigation
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {addItem}=useCartStore()

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      if (!id) {
        setError("Product ID not provided.");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/user/products/single/${id}`
      );

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      setProduct(data.product || data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: product._id || id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // Navigate to cart page
   
  };

  // Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 animate-pulse p-6">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-80 bg-gray-300 rounded-lg" />
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={fetchProduct}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 text-xl text-red-500 font-semibold">
        Product not found.
      </div>
    );
  }

  const { image, title, description, price, category } = product;

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4">
    <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-12">

        {/* Product Image */}
        <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6">
          <img
            src={image}
            alt={title}
            className="max-h-[480px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-5">
            <span className="inline-block text-sm uppercase tracking-wider text-gray-500">
              {category?.title || "Uncategorized"}
            </span>

            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {title}
            </h1>

            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ₹{price}
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              {description || "No description available."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                addItem({
                  id: product._id,
                  title,
                  description,
                  price,
                  image,
                  qty: 1,
                });
                navigate("/cart");
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-4 text-lg font-semibold text-black shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              🛒 Add to Cart
            </button>

            <Link
              to={`/Proceed/${category?._id || ""}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300"
            >
              Buy now
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)};

export default SingleProduct;