import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Proceed() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("orderSummary"));
    if (!storedOrder) {
      navigate("/cart");
    } else {
      setOrder(storedOrder);
    }
  }, [navigate]);

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    localStorage.removeItem("orderSummary");
    navigate("/");
  };

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-10">
      <div className="relative max-w-4xl w-full p-10 rounded-3xl bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_60px_rgba(255,215,0,0.2)]">

        {/* GOLD GLOW TOP BAR */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-[0_0_30px_rgba(255,215,0,0.8)]"></div>

        <h1 className="text-center text-5xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-200 text-transparent bg-clip-text drop-shadow-lg">
          Order Summary
        </h1>

        {/* ITEMS */}
        <div className="mt-10 flex flex-col gap-6">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white/10 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-xl hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain rounded-xl bg-black/20 p-2 border border-white/10"
              />      

              <div className="flex-1">
                <p className="text-xl font-semibold text-white">{item.title}</p>
                <p className="text-gray-300 text-sm mt-1">
                  Qty: {item.quantity || 1} | ₹{item.price} each
                </p>
              </div>

              <p className="text-yellow-300 font-bold text-xl">
                ₹{Number(item.price) * (item.quantity || 1)}
              </p>
            </div>
          ))}
        </div>

        {/* PRICE SECTION */}
        <div className="mt-10 bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-inner">
          <div className="flex justify-between text-gray-300 text-lg mb-2">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-300 text-lg mb-2">
            <span>GST (18%)</span>
            <span>₹{order.gst}</span>
          </div>
          <div className="flex justify-between text-gray-300 text-lg mb-4">
            <span>Delivery Fee</span>
            <span>₹{order.deliveryFee}</span>
          </div>

          <div className="flex justify-between text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text drop-shadow-xl pt-3">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handlePlaceOrder}
          className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-extrabold text-xl shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:shadow-[0_0_40px_rgba(255,215,0,0.9)] transition-all duration-300 hover:scale-[1.03]"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Proceed;