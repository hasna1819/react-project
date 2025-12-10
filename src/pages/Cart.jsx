import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../CartStore";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center p-10">
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-8 text-center tracking-wide">
        Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-xl text-center italic">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-6 justify-center">
            {cart.map((item) => (
              <div
                key={item.id}
                className="w-72 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 p-6 flex flex-col items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-xl w-48 h-48 object-contain shadow-xl mb-4"
                />
                <h3 className="text-xl font-bold text-gray-100 text-center mb-2">
                  {item.title}
                </h3>
                <p className="text-yellow-400 font-semibold mb-2">
                  ₹{item.price} x {item.quantity || 1} = ₹
                  {item.price * (item.quantity || 1)}
                </p>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.max((item.quantity || 1) - 1, 1)
                      )
                    }
                    className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold"
                  >
                    -
                  </button>
                  <span className="text-gray-100 font-semibold">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) + 1)
                    }
                    className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-full py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl text-gray-100 w-full max-w-xl flex flex-col gap-3">
            <h3 className="text-2xl font-bold text-yellow-400">
              Total: ₹{totalPrice}
            </h3>
          </div>

          <button
            onClick={() => navigate("/proceed")}
            className="mt-6 w-1/2 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold shadow-2xl hover:scale-105 transition-transform"
          >
            Proceed to Checkout
          </button>
        </>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 w-1/3 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold"
      >
        Home
      </button>
    </div>
  );
}

export default Cart;
