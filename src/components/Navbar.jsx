import React from "react";
import { ShoppingCart, User, Search } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full bg-red-500 text-black shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide cursor-pointer">
          ShopEase
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li className="hover:text-gray-200 cursor-pointer transition">Home</li>
          <li className="hover:text-gray-200 cursor-pointer transition">Products</li>
          <li className="hover:text-gray-200 cursor-pointer transition">About</li>
          <li className="hover:text-gray-200 cursor-pointer transition">Contact</li>
        </ul>

        {/* Search Bar + Icons */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center bg-white text-gray-800 rounded-full px-3 py-1 w-48 md:w-64">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none text-sm w-full bg-transparent"
            />
          </div>

          <User size={22} className="cursor-pointer hover:text-gray-200" />
          <ShoppingCart size={22} className="cursor-pointer hover:text-gray-200" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
