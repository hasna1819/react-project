import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: null,
    description: "",
    category: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const PRODUCT_API = "http://localhost:8080/products";
  const CATEGORY_API = "http://localhost:8080/category";
  const token = localStorage.getItem("token");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file change with preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      if (form.image) formData.append("image", form.image);

      const res = await fetch(PRODUCT_API, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();
      setProducts([...products, data.product]);

      // Reset form
      setForm({
        title: "",
        price: "",
        image: null,
        description: "",
        category: "",
      });
      setImagePreview(null);
    } catch (err) {
      alert("Error adding product");
      console.error(err);
    }

    setLoading(false);
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(`${PRODUCT_API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting product");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Product Manager</h1>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[70%] bg-white shadow-lg p-6 mb-10"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="border px-4 py-2 rounded"
            required
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border px-4 py-2 rounded"
            required
          />

          <div>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="border px-4 py-2 rounded"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover rounded"
              />
            )}
          </div>

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border px-4 py-2 rounded"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 bg-indigo-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Product Table */}
      <div className="w-[90%] md:w-[80%] bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((p, i) => (
                <tr key={p._id} className="border-b">
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={p.image || "https://via.placeholder.com/50?text=No+Image"}
                      alt={p.title}
                      className="w-14 h-14 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/50?text=No+Image";
                      }}
                    />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.category?.title || "N/A"}</td>
                  <td>₹{p.price}</td>
                  <td>{p.description}</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="text-red-500 text-2xl"
                    >
                      <TiDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
