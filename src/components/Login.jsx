import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

function Login() {
  const [showPopup, setShowPopup] = useState(false);

  const playSuccessSound = () => {
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2021/08/04/audio_4c62bb5a26.mp3?filename=correct-2-46134.mp3"
    );
    audio.volume = 0.6;
    audio.play();
  };

  const handleLogin = () => {
    playSuccessSound();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex justify-center items-center p-4 relative overflow-hidden">

      {/* ---------- Compact Login Card ---------- */}
      <div className="w-full max-w-xs bg-white/30 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-6 flex flex-col items-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide drop-shadow-lg text-center">
          Welcome Back
        </h1>

        {/* Email Input */}
        <div className="relative w-full">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-lg" />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full h-10 sm:h-12 bg-white/60 border border-white/40 rounded-xl pl-10 pr-3 text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
          />
        </div>

        {/* Password Input */}
        <div className="relative w-full">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-lg" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full h-10 sm:h-12 bg-white/60 border border-white/40 rounded-xl pl-10 pr-3 text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl py-2 sm:py-3 shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] transition transform text-sm sm:text-base"
        >
          Login
        </button>

        {/* Google Button with link */}
        <a
          href="https://accounts.google.com/signin"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-white/80 text-gray-700 font-medium rounded-xl py-2 sm:py-3 shadow-md backdrop-blur-md border border-white/40
                     hover:bg-white hover:shadow-xl hover:scale-[1.03] transition text-sm sm:text-base"
        >
          <img
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            alt='Google Logo'
            className="w-5 h-5"
          />
          Continue with Google
        </a>

        <a className="text-xs sm:text-sm text-gray-700 hover:text-white hover:underline">
          Forgotten account?
        </a>

        <p className="text-xs sm:text-sm text-gray-700 hover:text-white hover:underline text-center">
          Don’t have an account? <a href="Signup" className="font-semibold">Signup</a>
        </p>
      </div>

      {/* ---------- Compact Popup Modal ---------- */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/30 backdrop-blur-xl text-white font-semibold py-6 px-6 rounded-3xl shadow-2xl text-center max-w-xs w-[90%] border border-white/30"
          >
            <h2 className="text-2xl font-bold mb-2">🎉 Login Successful!</h2>
            <p className="text-white/80 mb-3 text-sm">Welcome back! You are now logged in.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-5 rounded-xl text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Login;
