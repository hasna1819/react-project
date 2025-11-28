import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {
  const [ Categories, setCategories ] = useState([]);
  const [  products, setProducts    ] = useState ([]);
  const [ loading,   setLoading  ]  = useState(true);


  // Fetch categories

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("http://localhost:8080/category"),
          fetch("http://localhost:8080/products/id:"),
        ]);

        const [catData, prodData]= await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);

        setCategories(catData);
        setProducts(prodData);
      } catch (err) {
        console.error ("error fetching data:", err)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[]);
  return (
  <div
  className="w-full min-h-screen flex flex-col font-sans bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?auto=format&fit=crop&w=2000&q=90')",
    backgroundAttachment: "fixed",
  }}
>
  {/* Luxury Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80 backdrop-blur-sm pointer-events-none"></div>

  {/* Navbar */}
  <nav className="relative w-full bg-gradient-to-r from-yellow-700/80 via-yellow-800/80 to-yellow-900/80 backdrop-blur-xl text-white flex flex-col md:flex-row justify-between items-center px-8 py-4 shadow-2xl rounded-b-2xl border-b border-yellow-200/20">
    <h1 className="text-3xl font-bold tracking-wide mb-2 md:mb-0">
      <span className="text-yellow-300 drop-shadow-md">Shopeazy</span>
      
    </h1>

     <div className="hidden md:block w-[30%]">
    <input
      type="text"
      placeholder="🔍 Search luxury products..."
      className="
        w-full px-5 py-3 rounded-full 
        text-gray-900 bg-white/90
        placeholder-gray-500
        border border-yellow-200 shadow-lg
        focus:outline-none focus:ring-4 focus:ring-yellow-400/50
        transition-all duration-300
      "
    />
  </div>

    <ul className="flex gap-8 mt-3 md:mt-0 text-lg font-medium">
      {["Home", "Products", "Cart", "Profile"].map((item) => (
        <li
          key={item}
          className="cursor-pointer hover:text-yellow-300 transition-all duration-200 hover:scale-105"
        >
          {item}
        </li>
      ))}
    </ul>
    {/* Mobile Hamburger Button */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="md:hidden text-yellow-300 text-3xl focus:outline-none"
  >
    <i className="fa-solid fa-bars"></i>
  </button>
  
  </nav>


 
 {/* HERO SECTION — LUXURY THEME */}
      <section
        className="relative flex flex-col md:flex-row justify-between items-center py-28 px-8 md:px-24  mt-10 bg-cover bg-center bg-no-repeat shadow-2xl overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519223400710-6da9e1b777ea?auto=format&fit=crop&w=2000&q=90')",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-transparent backdrop-blur-md  z-0"></div>

        {/* Luxury Color Blobs */}
        <div className="absolute top-0 -left-24 w-96 h-96 bg-yellow-300 mix-blend-multiply blur-[110px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] bg-pink-300 mix-blend-multiply blur-[120px] opacity-30 animate-pulse delay-200"></div>

        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-[40px] pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-45 animate-shine"></div>
        </div>

        {/* Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left z-20 animate-fadeIn">
          <h2 className="text-5xl md:text-7xl font-extrabold text-yellow-900 leading-tight tracking-tight">
            Shop <span className="text-yellow-600 font-family: var(--font-serif)">Eazy</span>
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

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-16 md:mt-0 relative z-20 animate-fadeIn delay-300">
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAzL3N0YXJ0dXBpbWFnZXNfcGhvdG9fb2ZfYXNpYW5fd29tYW5fd2l0aF9zaG9wcGluZ19iYWdfc21pbGVfYW5kX19hMGE3YTBkZS03YTNjLTQzMTYtOGU2Ny1jMzc4NTVmZmJlN2Etcm0xNjgzLTAxYV8xLnBuZw.png"
            alt="shopping"
            className="w-72 md:w-[500px] rounded-3xl shadow-2xl shadow-yellow-300/50 transform transition-transform duration-700"
          />
        </div>
      </section>

 {/* Categories Section */}
<section className="py-16 px-8 md:px-16 bg-yellow-100 rounded-2xl">
  <h3 className="text-3xl font-bold text-center mb-10 text-black">
    Browse by Categories
  </h3>

  {loading ? (
    <p className="text-center text-black">Loading...</p>
  ) : Categories.length === 0 ? (
    <p className="text-center text-gray-500">No categories available</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
      {Categories.map((cat) => (
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


    {/* featured products section */}
   <section className="py-16 px-8 md:px-16 bg-yellow-100">
      <h3 className="text-3xl font-bold mb-10 text-gray-800">Explore our Products</h3>
   
    { loading ? (
      <p className="text-center text-gray-500">Loading...</p>
    ): products.length === 0 ? (
      <p className="text-center text-gray-500">No products available</p>
    ):(
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((item) => (
          <div
          key={item._id} 
          className="bg-white rounded-xl hover:shadow-2xl transition-all duration-300  overflow-hidden group">
            <img 
            src={item.image}
             alt={item.title}
                   className='rounded-t-xl w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300'
                    loading="lazy"
             />
             <div className="p-5">
               <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h4>
             </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {item.description}
              </p>
              <p className="text-blue-600 font-semibold text-lg">
                ₹ {item.price}
              </p>
              <p className="text-blue-600 font-semibold text-lg">
                {item?.category?.title??"no category"}
              </p>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-all duration-300">
                Add to Cart
              </button>
          </div>
        ))}
      </div>
    )}
    </section>

     {/* Footer */}

    <footer className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white text-center py-6 mt-auto shadow-lg">
  <p className="text-sm">
    {new Date().getFullYear()} <b>Shopeaze</b>. All rights reserved.
  </p>

  <div className="flex justify-center gap-5 mt-3 text-2xl">
        <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="hover:text-yellow-400 transition-colors duration-300"
    >
      <i className="fa-brands fa-facebook"></i>
    </a>
     
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="hover:text-pink-400 transition-colors duration-300"
    >
      <i className="fa-brands fa-instagram"></i>
    </a>
       <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="hover:text-blue-300 transition-colors duration-300"
    >
      <i className="fa-brands fa-twitter"></i>
    </a>
      </div>
     </footer>
   </div>
  )
}

export default Home