import React, { useState, useEffect } from "react";

// ------------------ Particle Background ------------------
function ParticleBackground() {
  useEffect(() => {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      id="particles"
      className="fixed top-0 left-0 w-full h-full -z-10"
    ></canvas>
  );
}

// ------------------ Signup Form ------------------
function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("User registered successfully!");
      console.log("Created user:", data);

      // Clear form
      setForm({ name: "", email: "", password: "" });

    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-700 overflow-hidden px-4">
      <ParticleBackground />

      <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-white/30 text-white hover:scale-105 transition-transform duration-300 relative overflow-hidden">

        {/* Floating Blob Decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-tr from-cyan-400 via-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>

        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full bg-white/10 placeholder-white/70 rounded-xl py-3 px-4 border-2 border-white/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-300"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full bg-white/10 placeholder-white/70 rounded-xl py-3 px-4 border-2 border-white/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-300"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full bg-white/10 placeholder-white/70 rounded-xl py-3 px-4 border-2 border-white/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-300"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-white"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-white/70 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-300 hover:underline font-semibold">
            Login
          </a>
        </p>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.2); opacity: 0.35; }
          }
          .animate-pulse {
            animation: pulse 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Signup;
