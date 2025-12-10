import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useCartStore from "../CartStore";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();


  const {cart,removeFromCart}=useCartStore()



  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center p-10">
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-8 text-center tracking-wide">
        Cart Section
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-xl text-center italic">Your cart is empty.</p>
      ) : (
        <>
          <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-6 justify-center">
            {cart.map((item) => (
              <div
                key={item.id}
                className="w-72 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 p-6 flex flex-col justify-between transition-transform hover:scale-105"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-xl w-48 h-48 object-contain shadow-xl mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-100 text-center mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-2">Category: {item.category?.title || "N/A"}</p>
                  <p className="text-yellow-400 font-semibold mb-2">
                    ₹{item.price} x {item.quantity || 1}
                  </p>
                </div>
                <div className="text-gray-300 text-sm mb-4">
                
                </div>
                <button
                  onClick={() => {removeFromCart(item.id)}}
                  className="w-full py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl text-gray-100 w-full max-w-xl flex flex-col gap-3">
            
           
          </div>

          <button
            
            className="mt-6 w-1/2 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold shadow-2xl hover:scale-105 transition-transform"
          >
            Proceed to Checkout
          </button>
        </>
      )}

      <button onClick={()=>{
        navigate('/')
      }}>
        home
      </button>
    </div>
  );
}

export default Cart;