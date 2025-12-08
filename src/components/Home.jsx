import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";
function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token=localStorage.getItem("token")

  // Fetch categories + products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("http://localhost:8080/category"),
          fetch("http://localhost:8080/products",{
  headers: {
    "Authorization": `Bearer ${token}`
  }
}),
        ]);

        const [catData, prodData] = await Promise.all([catRes.json(), prodRes.json()]);
        setCategories(catData);
        setProducts(prodData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if(!token){
  
   return <Navigate to={'/login'}/>
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

        <div className="md:w-1/2 flex justify-center md:justify-end mt-16 md:mt-0">
          {/* Optional hero image */}
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

      {/* PRODUCTS */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-br from-amber-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-300/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-400/30 blur-[140px] rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-purple-300/20 blur-[180px] rounded-full"></div>

        <h3 className="text-5xl font-extrabold mb-16 tracking-tight text-center drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-800">
          Explore Our Premium Products
        </h3>

        {loading ? (
          <p className="text-center text-gray-500 text-lg animate-pulse">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No products available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {products.map((item) => (
              <div
                key={item._id}
                className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)]
                           hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:bg-white/80 transition-all duration-700 overflow-hidden 
                           border border-white/40 hover:-translate-y-3"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-t-3xl w-full h-64 object-cover transform hover:scale-110 transition-all duration-700"
                  />
                </div>

                <div className="p-7">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <p className="text-blue-700 font-extrabold text-2xl mb-1">₹ {item.price}</p>
                  <p className="text-gray-700 text-sm mb-5">{item?.category?.title ?? "No category"}</p>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-center py-6 mt-20 shadow-xl">
        <p className="text-sm tracking-wide">
          {new Date().getFullYear()} <b>Shopeaze</b>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;