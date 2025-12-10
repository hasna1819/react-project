import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../CartStore";

function Proceed() {
  const { cart, clearCart, updateItemQuantity, removeItem } = useCartStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Step 1: Checkout Form, Step 2: Confirm Order
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNext = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.cardNumber) {
      alert("Please fill in all required fields.");
      return;
    }
    setStep(2); // Go to Confirm Order
  };

  const handleConfirmPurchase = () => {
    setOrderConfirmed(true);
    // Do not clear cart immediately so we can show purchased items
  };

  const incrementQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    updateItemQuantity(id, (item.quantity || 1) + 1);
  };

  const decrementQuantity = (id) => {
    const item = cart.find((i) => i.id === id);
    if ((item.quantity || 1) > 1) {
      updateItemQuantity(id, item.quantity - 1);
    }
  };

  if (cart.length === 0 && !orderConfirmed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty!</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-10">
        <h2 className="text-4xl font-extrabold text-green-400 mb-6 text-center">
          Purchase Confirmed!
        </h2>
        <p className="text-lg mb-4">Thank you for your order, {form.name}.</p>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl w-full max-w-xl text-gray-100 flex flex-col gap-2">
          <h3 className="text-yellow-400 font-bold text-xl mb-2">Your Details:</h3>
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Address:</strong> {form.address}</p>
          <p><strong>Card Number:</strong> **** **** **** {form.cardNumber.slice(-4)}</p>

          <h3 className="text-yellow-400 font-bold text-xl mt-4 mb-2">Purchased Items:</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between bg-white/10 p-2 rounded-xl">
              <span>{item.title} x {item.quantity || 1}</span>
              <span>₹{item.price * (item.quantity || 1)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-yellow-400 text-xl mt-4">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
        <button
          onClick={() => { clearCart(); navigate("/"); }}
          className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center p-10">
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-8 text-center tracking-wide">
        {step === 1 ? "Checkout" : "Confirm Order"}
      </h2>

      {step === 1 ? (
        <form
          onSubmit={handleNext}
          className="mt-8 w-full max-w-xl bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl flex flex-col gap-4 text-gray-100"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"
            required
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"
            required
          />
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400 flex-1"
            />
            <input
              type="text"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="CVV"
              className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400 flex-1"
            />
          </div>

          <button
            type="submit"
            className="mt-4 py-3 w-full rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold shadow-2xl hover:scale-105 transition-transform"
          >
            Next
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="mt-2 w-full py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold"
          >
            Back to Cart
          </button>
        </form>
      ) : (
        <div className="w-full max-w-xl flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white/10 p-4 rounded-xl text-gray-100"
            >
              <div>
                <span>{item.title}</span>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="px-2 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="px-2 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span>₹{item.price * (item.quantity || 1)}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-2 py-1 bg-red-600 rounded hover:bg-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-bold text-yellow-400 text-xl mt-4">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={handleConfirmPurchase}
            className="mt-6 py-3 w-full rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-bold shadow-2xl hover:scale-105 transition-transform"
          >
            Confirm Purchase
          </button>

          <button
            onClick={() => setStep(1)}
            className="mt-2 w-full py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold"
          >
            Back to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Proceed;
