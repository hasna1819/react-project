import React from 'react';
import { Link } from 'react-router-dom';

function Card({ id, title, price, image }) {
  return (
    <div className="w-[260px] bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-5 m-4 transition-transform hover:shadow-2xl duration-300">
      <div className="w-full h-40 flex items-center justify-center mb-4">
        <img 
          src={image}
          alt={title || 'Product image'}
          className="h-full object-contain drop-shadow-md"
        />
      </div>
      
      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
        {title}
      </h2>
      
      <p className="text-xl font-bold text-blue-600 mb-4">
        {price}
      </p>
      
      <div className="flex gap-2">
        <Link 
          to={`/details/${id}`} 
          className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          View
        </Link>
        
        <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
