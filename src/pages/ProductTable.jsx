import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const PRODUCT_API = "http://localhost:8080/products";
  const CATEGORY_API = "http://localhost:8080/category";
  const BASE_URL = "http://localhost:8080";
  const token = localStorage.getItem("token");

  // Fetch products with token
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

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // Submit - Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("image", form.image);

      const res = await fetch(PRODUCT_API, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setProducts([...products, data.product]);

      setForm({
        title: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
    } catch (err) {
      alert("Error adding product");
    }

    setLoading(false);
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(`${PRODUCT_API}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed");

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting product");
    }
  };

  // Run on load
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

          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border px-4 py-2 rounded"
            required
          />

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
                      src={
                        p.image?.startsWith("http")
                          ? p.image
                          : `${BASE_URL}/${p.image}`
                      }
                      className="w-14 h-14 object-cover rounded"
                      alt=""
                    />
                  </td>

                  <td>{p.title}</td>
                  <td>{p.category?.title}</td>
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
