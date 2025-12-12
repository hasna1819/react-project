import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../CartStore";

const countries = {
  India: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat","Kerala"],
  USA: ["California", "New York", "Texas", "Florida", "Illinois"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
};

function Proceed() {
  const { cart, addToCart, removeFromCart, clearCart, getTotalPrice } = useCartStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
    paymentMethod: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Reset state when country changes
    if (name === "country") setForm((prev) => ({ ...prev, state: "" }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const { name, email, phone, street, city, state, postalCode, country, paymentMethod, cardName, cardNumber } = form;

    if (!name || !email || !phone || !street || !city || !state || !postalCode || !country || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    if (paymentMethod === "GPay" && (!cardName || !cardNumber || !form.expiry || !form.cvv)) {
      alert("Please fill in all GPay payment details.");
      return;
    }

    setStep(2);
  };

  const handleConfirmPurchase = () => setOrderConfirmed(true);

  const incrementQuantity = (id) => {
    const item = cart.find(i => i.id === id);
    if (item) addToCart(item, 1);
  };

  const decrementQuantity = (id) => {
    const item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      removeFromCart(id);
      addToCart(updatedItem, updatedItem.quantity);
    }
  };

  const handleRemove = (id) => removeFromCart(id);

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
          <p><strong>Phone:</strong> {form.phone}</p>
          <p><strong>Address:</strong> {form.street}, {form.city}, {form.state}, {form.postalCode}, {form.country}</p>

          <h3 className="text-yellow-400 font-bold text-xl mt-4 mb-2">Payment Method:</h3>
          <p>{form.paymentMethod === "COD" ? "Cash on Delivery" : "GPay"}</p>
          {form.paymentMethod === "GPay" && (
            <div>
              <p><strong>Card Name:</strong> {form.cardName}</p>
              <p><strong>Card Number:</strong> **** **** **** {form.cardNumber.slice(-4)}</p>
              <p><strong>Expiry:</strong> {form.expiry}</p>
            </div>
          )}

          <h3 className="text-yellow-400 font-bold text-xl mt-4 mb-2">Purchased Items:</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between bg-white/10 p-2 rounded-xl">
              <span>{item.title} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-yellow-400 text-xl mt-4">
            <span>Total:</span>
            <span>₹{getTotalPrice()}</span>
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
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"/>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"/>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"/>

          <input type="text" name="street" value={form.street} onChange={handleChange} placeholder="Street Address" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"/>
          <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"/>

          {/* Country Dropdown */}
          <select name="country" value={form.country} onChange={handleChange} required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400">
            <option value="">Select Country</option>
            {Object.keys(countries).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* State Dropdown */}
          <select name="state" value={form.state} onChange={handleChange} required disabled={!form.country} className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400">
            <option value="">Select State</option>
            {form.country && countries[form.country].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"/>

          {/* Payment Method */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-gray-100 font-semibold">Payment Method:</label>
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400">
              <option value="">Select</option>
              <option value="COD">Cash on Delivery</option>
              <option value="GPay">GPay</option>
            </select>
          </div>

          {form.paymentMethod === "GPay" && (
            <>
              <input type="text" name="cardName" value={form.cardName} onChange={handleChange} placeholder="Name on Card" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"/>
              <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Card Number" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:border-yellow-400"/>
              <div className="flex gap-4">
                <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 flex-1 focus:outline-none focus:border-yellow-400"/>
                <input type="text" name="cvv" value={form.cvv} onChange={handleChange} placeholder="CVV" required className="p-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 flex-1 focus:outline-none focus:border-yellow-400"/>
              </div>
            </>
          )}

          <button type="submit" className="mt-4 py-3 w-full rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold shadow-2xl hover:scale-105 transition-transform">Next</button>
          <button type="button" onClick={() => navigate("/cart")} className="mt-2 w-full py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold">Back to Cart</button>
        </form>
      ) : (
        <div className="w-full max-w-xl flex flex-col gap-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white/10 p-4 rounded-xl text-gray-100">
              <div>
                <span>{item.title}</span>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => decrementQuantity(item.id)} className="px-2 bg-gray-700 rounded hover:bg-gray-600">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)} className="px-2 bg-gray-700 rounded hover:bg-gray-600">+</button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span>₹{item.price * item.quantity}</span>
                <button onClick={() => handleRemove(item.id)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-500">Remove</button>
              </div>
            </div>
          ))}

          <div className="flex justify-between font-bold text-yellow-400 text-xl mt-4">
            <span>Total:</span>
            <span>₹{getTotalPrice()}</span>
          </div>

          <button onClick={handleConfirmPurchase} className="mt-6 py-3 w-full rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-bold shadow-2xl hover:scale-105 transition-transform">
            Confirm Purchase
          </button>

          <button onClick={() => setStep(1)} className="mt-2 w-full py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold">
            Back to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Proceed;
