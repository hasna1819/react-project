import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {


        // Optional: store token
        const data = await response.json();


        localStorage.setItem("token", data.token);

        // Redirect to Home on success
        navigate("/Home");
      } else {
        // Redirect to Home on failure as well
        // navigate("/Home");
      }
    } catch (err) {
      console.error("Login error:", err);
      // navigate("/Home");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex justify-center items-center p-4 relative overflow-hidden">

      {/* ---------- Login Card ---------- */}
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
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full h-10 sm:h-12 bg-white/60 border border-white/40 rounded-xl pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
          />
        </div>

        {/* Password Input */}
        <div className="relative w-full">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-lg" />
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full h-10 sm:h-12 bg-white/60 border border-white/40 rounded-xl pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl py-2 sm:py-3 shadow-lg hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] transition transform text-sm sm:text-base"
        >
          Login
        </button>

        {/* Google Login */}
        <a
          href="https://accounts.google.com/signin"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-white/80 text-gray-700 font-medium rounded-xl py-2 sm:py-3 shadow-md backdrop-blur-md border border-white/40 hover:bg-white hover:shadow-xl hover:scale-[1.03] transition text-sm sm:text-base"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
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

    </div>
  );
}

export default Login;
