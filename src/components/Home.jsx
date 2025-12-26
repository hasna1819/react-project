import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import useCartStore from "../CartStore";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { addToCart } = useCartStore(); // get addToCart from store

  // Fetch categories + products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("http://localhost:8080/category"),
          fetch("http://localhost:8080/products", {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }),
        ]);

        const [catData, prodData] = await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);
        setCategories(catData);
        setProducts(prodData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col font-sans bg-cover bg-center bg-no-repeat pt-24">
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative flex flex-col md:flex-row justify-between items-center py-28 px-8 md:px-24 mt-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?auto=format&fit=crop&w=2000&q=90')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="md:w-1/2 space-y-6 text-center md:text-left z-20">
          <h2 className="text-5xl md:text-7xl font-extrabold text-yellow-900 leading-tight">
            Shop <span className="text-yellow-600">Eazy</span>
          </h2>
          <p className="text-yellow-800 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            Premium styles, curated collections, and golden-quality shopping.
          </p>

          <div className="flex justify-center md:justify-start space-x-6 mt-4">
            <button className="bg-white text-yellow-800 font-semibold px-12 py-4 rounded-full shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
              🛒 Shop Now
            </button>
            <button className="bg-yellow-800 text-white font-semibold px-12 py-4 rounded-full shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
              Explore More
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 px-8 md:px-16 bg-yellow-100 rounded-2xl">
        <h3 className="text-3xl font-bold text-center mb-10 text-black">
          Browse by Categories
        </h3>

        {loading ? (
          <p className="text-center text-black">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {categories.map((cat) => (
              <Link
                to={`/ProductDetail/${cat._id}`}
                key={cat._id}
                className="flex flex-col items-center p-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-black"
                />
                <h4 className="text-md font-semibold text-gray-700">{cat.title}</h4>
              </Link>
            ))}
          </div>
        )}
      </section>

    <section className="relative py-24 px-6 md:px-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
  {/* Section Title */}
  <h3 className=" bg-amber-100 text-5xl font-extrabold mb-12 text-center drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-800">
    Explore Our Premium Products
  </h3>

  {loading ? (
    <p className="text-center text-gray-500 text-lg animate-pulse">Loading...</p>
  ) : products.length === 0 ? (
    <p className="text-center text-gray-500 text-lg">No products available</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {products.map((item) => (
        <div
          key={item._id}
          className="relative bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-500 flex flex-col items-center p-10"
        >
          {/* Image */}
          <div className="w-28 h-28 overflow-hidden rounded-xl mb-3">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <h4 className="text-sm font-semibold text-gray-900 text-center mb-1 truncate w-full">
            {item.title}
          </h4>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2 text-center">
            {item?.category?.title ?? "No category"}
          </p>
          <p className="text-indigo-600 font-bold text-sm mb-2">₹ {item.price}</p>

          {/* Add to Cart Button */}
          <button
            className="w-full py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            onClick={() => {
              addToCart(
                {
                  id: item._id,
                  title: item.title,
                  price: item.price,
                  image: item.image,
                  description: item.description,
                  category: item.category,
                },
                1
              );
              navigate("/SingleProduct");
            }}
          >
            Add To Cart
          </button>

          {/* Mini Premium Badge */}
          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 font-bold px-2 py-0.5 rounded-full text-[10px] shadow">
          NEW
          </div>
        </div>
      ))}
    </div>
  )}
</section>


    </div>
  );
}

export default Home;