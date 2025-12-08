import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddAddress() {
  const navigate = useNavigate();

  // Parallax Effect
  useEffect(() => {
    let frame;
    const handleMouseMove = (e) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        document.documentElement.style.setProperty("--x", `${x}px`);
        document.documentElement.style.setProperty("--y", `${y}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle form submit
  const handleSaveAddress = (e) => {
    e.preventDefault();
    navigate("/home"); // Redirect to home page after saving
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden p-6">

      {/* ---- Background Layers ---- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Blob 1 */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-600 to-pink-600 
          rounded-full blur-[120px] opacity-40 -top-32 -left-32
          translate-x-[var(--x)] translate-y-[var(--y)] transition-all duration-200">
        </div>

        {/* Blob 2 */}
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-cyan-400 
          rounded-full blur-[120px] opacity-40 bottom-0 right-0
          translate-x-[calc(var(--x)*-1)] translate-y-[calc(var(--y)*-1)] transition-all duration-200">
        </div>

        {/* Rings */}
        <div className="absolute w-[350px] h-[350px] border-4 border-white/10 rounded-full 
          animate-spin-slow top-10 right-[25%]"></div>

        <div className="absolute w-[500px] h-[500px] border-4 border-white/5 rounded-full 
          animate-spin-slower bottom-10 left-[20%]"></div>
      </div>

      {/* ---- Add Address Card ---- */}
      <div className="relative w-full max-w-lg p-10 rounded-3xl bg-white/10 backdrop-blur-2xl 
        border border-white/20 shadow-2xl transition-all duration-300
        translate-x-[calc(var(--x)/4)] translate-y-[calc(var(--y)/4)]">

        <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-xl">
          Add Delivery Address
        </h2>

        <form onSubmit={handleSaveAddress} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="input-field"
              required 
            />
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="input-field"
              required 
            />
          </div>

          <input 
            type="text"
            placeholder="Street Address"
            className="input-field"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text"
              placeholder="City"
              className="input-field"
              required
            />
            <input 
              type="text"
              placeholder="State"
              className="input-field"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text"
              placeholder="Postal / ZIP Code"
              className="input-field"
              required
            />
            <input 
              type="text"
              placeholder="Country"
              className="input-field"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r 
              from-purple-500 to-pink-500 hover:scale-105 transition duration-300 
              shadow-lg shadow-pink-500/30">
            Save Address
          </button>

        </form>
      </div>

      {/* Animations */}
      <style>{`
        .input-field {
          @apply w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20 
          placeholder-gray-400 text-white focus:ring-2 focus:ring-pink-500 outline-none;
        }
        .animate-spin-slow {
          animation: spin 18s linear infinite;
        }
        .animate-spin-slower {
          animation: spin 28s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}

export default AddAddress;