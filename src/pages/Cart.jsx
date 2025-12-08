import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);
    const gst = +(subtotal * 0.18).toFixed(2);
    const deliveryFee = cartItems.length > 0 ? 50 : 0;
    const total = subtotal + gst + deliveryFee;
    return { subtotal, gst, deliveryFee, total };
  };

  const handleProceed = () => {
    // Store order summary in localStorage for Proceed page
    const totals = calculateTotals();
    localStorage.setItem("orderSummary", JSON.stringify({ items: cartItems, ...totals }));
    navigate("/proceed");
  };

  const { subtotal, gst, deliveryFee, total } = calculateTotals();

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center p-10">
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-8 text-center tracking-wide">
        Cart Section
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-xl text-center italic">Your cart is empty.</p>
      ) : (
        <>
          <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-6 justify-center">
            {cartItems.map((item) => (
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
                  <p>Subtotal: ₹{Number(item.price) * (item.quantity || 1)}</p>
                  <p>GST (18%): ₹{(+item.price * 0.18).toFixed(2)}</p>
                  <p>Delivery Fee: ₹{cartItems.length > 0 ? 50 : 0}</p>
                  <p className="text-yellow-400 font-bold text-lg mt-2">
                    Total: ₹{Number(item.price) * (item.quantity || 1) + (+item.price * 0.18) + (cartItems.length > 0 ? 50 : 0)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-full py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl text-gray-100 w-full max-w-xl flex flex-col gap-3">
            <p>Subtotal: ₹{subtotal}</p>
            <p>GST (18%): ₹{gst}</p>
            <p>Delivery Fee: ₹{deliveryFee}</p>
            <p className="text-yellow-400 font-bold text-xl">Total: ₹{total}</p>
          </div>

          <button
            onClick={handleProceed}
            className="mt-6 w-1/2 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold shadow-2xl hover:scale-105 transition-transform"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;