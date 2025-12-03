import React, { useState } from "react";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const nav=useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "Home" },
    { name: "Products", path: "/products" },
    
    { name:"Login", path:"/login"},
    {name:"Signup", path:"/signup"}
  ];

  return (
    <nav className="w-full bg-blue-400 text-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Shopeaze
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:bg-black px-3 py-1 rounded transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

<button onClick={()=>{
  localStorage.removeItem("token")

  nav('/login')
}}>logout</button>
        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Search bar (Desktop only) */}
          <div className="hidden sm:flex items-center bg-white text-gray-800 rounded-full px-3 py-1 w-48 md:w-64">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none text-sm w-full bg-transparent"
            />
          </div>

         <a href="Profile">
  <User size={22} className="cursor-pointer hover:bg-black p-1 rounded" />
</a>
 <a href="Cart">
          <ShoppingCart size={22} className="cursor-pointer hover:bg-black p-1 rounded" />
</a>
          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden p-1 rounded hover:bg-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 shadow-lg">
          <ul className="flex flex-col space-y-3 px-6 py-4 text-white text-lg">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="block py-2 hover:bg-blue-600 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Search bar mobile */}
            <div className="flex items-center bg-white text-gray-800 rounded-full px-3 py-2 mt-2">
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                className="outline-none text-sm w-full bg-transparent"
              />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
