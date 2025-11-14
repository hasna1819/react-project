import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const PRODUCT_API = `http://localhost:8080/products/${id}`;

  // Fetch product details
  const fetchProductDetails = async () => {
    try {
      const res = await fetch(PRODUCT_API);

      if (!res.ok) throw new Error("Failed to fetch product");

      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) return <div className="p-10 text-xl">Loading...</div>;

  if (!product)
    return <div className="p-10 text-xl text-red-500">Product not found</div>;

  return (
    <div className="w-full min-h-screen flex justify-center p-10 bg-gray-100">
{
  product.map(item=><>
        <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] md:w-[60%]">
        <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

        <img
          src={item.image}
          alt={item.title}
          className="w-60 h-60 object-contain mx-auto mb-4"
        />

        <p className="text-lg mb-2">
          <strong>Price:</strong> ₹{item.price}
        </p>

        <p className="text-lg mb-2">
          <strong>Category:</strong> {item?.category?.title??"N/A"}
        </p>

        <p className="text-gray-700 mt-3 leading-relaxed">
          {item.description || "No description available."}
        </p>
      </div>
  
  </>)
}
    </div>
  );
}

export default ProductDetails;
