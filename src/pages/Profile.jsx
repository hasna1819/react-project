import React, { useState } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-10">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Profile</h2>

        {submitted ? (
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-green-600">Profile Created Successfully 🎉</h3>
            <p><strong>Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Bio:</strong> {formData.bio}</p>
            {formData.avatar && (
              <img
                src={formData.avatar}
                alt="avatar"
                className="w-20 h-20 rounded-full mx-auto mt-2 border border-gray-300"
              />
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio (max 200 chars)</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength={200}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Avatar Image URL</label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow-md transition-colors"
            >
              Create Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
