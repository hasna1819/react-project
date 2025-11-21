import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";

function CategoryPage() {
  const user = "http://localhost:8080/category";

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", image: null });
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all categories
  const fetchProducts = async () => {
    try {
      const res = await fetch(user);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 🔹 Handle text changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle file change
  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // 🔹 Add a new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.image) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("image", form.image);

      const res = await fetch(user, {
        method: "POST",
        body: formData, // ✅ formData (NOT JSON)
      });

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();

      if (data.product) {
        setProducts((prev) => [...prev, data.product]);
      }

      setForm({ title: "", image: null });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    }

    setLoading(false);
  };

  // 🔹 Delete category
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${user}/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Category Manager
      </h1>

      {/* 🟩 Add Category Form */}
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[70%] lg:w-[60%] bg-white shadow-lg rounded-lg p-6 mb-10"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add New Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Category"
            value={form.title}
            onChange={handleChange}
            className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />

          {/* 🟧 File Upload */}
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border rounded-md px-4 py-2 bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* 🟦 Category Table */}
      <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className="border-b">
                  <td className="px-4 py-3 text-center">{index + 1}</td>
                  <td className="px-4 py-3 text-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 h-14 object-contain rounded-md border mx-auto"
                    />
                  </td>
                  <td className="px-4 py-3">{product.title}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-500 text-2xl"
                    >
                      <TiDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryPage;
