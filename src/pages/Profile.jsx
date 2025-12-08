import React, { useState, useRef } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email.";
    if (formData.bio.length > 200) newErrors.bio = "Bio must be under 200 characters.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      console.log("Profile Created:", formData);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setFormData((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setFormData((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 via-white to-gray-200 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Live Preview Panel */}
        <div className="md:w-1/2 bg-indigo-600 text-white flex flex-col items-center justify-center p-8 relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src={formData.avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            />
          </div>

          <h2 className="mt-6 text-2xl font-bold">{formData.fullName || "Your Name"}</h2>
          <p className="mt-2 text-indigo-100">{formData.email || "your.email@example.com"}</p>
          <p className="mt-4 text-center text-indigo-200">{formData.bio || "Write a short bio about yourself..."}</p>

          <div className="absolute bottom-6 flex space-x-3">
            <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold shadow">Premium</span>
            <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold shadow">Pro</span>
          </div>
        </div>

        {/* Form Panel */}
        <div className="md:w-1/2 p-10 bg-white">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h3 className="text-2xl font-bold text-green-600 animate-bounce">
                Profile Created Successfully 🎉
              </h3>
              <p className="text-gray-700">{formData.fullName}</p>
              <p className="text-gray-500">{formData.email}</p>
              <p className="text-gray-500">{formData.bio}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`mt-2 w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-500 mt-1 text-sm">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-2 w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">Bio (max 200 chars)</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength={200}
                  className={`mt-2 w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    errors.bio ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell us a little about yourself..."
                />
                {errors.bio && <p className="text-red-500 mt-1 text-sm">{errors.bio}</p>}
              </div>

              {/* Drag-and-Drop Avatar Upload */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">Avatar Upload</label>
                <div
                  className={`w-full h-32 flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer ${
                    dragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current.click()}
                >
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-gray-400">Drag & drop an image or click to upload</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                Create Profile
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
