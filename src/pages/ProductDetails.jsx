// src/pages/Singleproduct.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const PRODUCT_API = `http://localhost:8080/products/${id}`;

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(PRODUCT_API);
      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();

      setProducts(Array.isArray(data) ? data : [{ ...data }]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) return <div className="p-10 text-xl text-center">Loading...</div>;

  if (!products.length)
    return (
      <div className="p-10 text-xl text-center text-red-500">
        Product not found
      </div>
    );

  return (
    <div className="w-full min-h-[100vh] p-10 flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

      {products.map((item, index) => (
        <div
          key={item.id || index}
          className="
            w-[50%] md:w-[15%] lg:w-[30%] 
            bg-white/10 backdrop-blur-xl 
            border border-gray-700 
            rounded-2xl 
            shadow-2xl shadow-black/40 
            p-8 
            text-white 
            transition-all 
            duration-500 
            hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/70
          "
        >
          
          <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide text-[#D4AF37]">
            {item.title}
          </h1>

          <div className="flex justify-center mb-6">
            <img
              src={item.image}
              alt={item.title}
              className="
                w-30 h-30 object-contain 
                rounded-xl 
                shadow-lg shadow-black/40 
                border border-gray-700 
                hover:scale-105 transition-transform duration-300
              "
            />
          </div>

          <p className="text-2xl text-center mb-4 text-[#F2DFA7]">
            <strong className="text-[#D4AF37]">Price: </strong>
            ₹{item.price}
          </p>

          <p className="text-lg leading-relaxed text-gray-200 text-center">
            {item.description || "No description available."}
          </p>
          <button
  className="
    w-60% 
    mt-6 
    py-3 
    text-lg 
    font-semibold 
    rounded-xl 
    bg-gradient-to-r from-[#D4AF37] to-[#b8962e] 
    text-black 
    shadow-xl shadow-black/40 
    border border-yellow-700 
    transition-all duration-300 
    hover:from-[#e7c45c] hover:to-[#D4AF37] 
    hover:shadow-2xl hover:shadow-yellow-700/50 
    hover:scale-105 
    active:scale-95
  "
>
 view
</button>

        </div>
      ))}
    </div>
  );
}

export default ProductDetails;
