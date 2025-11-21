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

  const [loading, setLoading] = useState(false);

  const PRODUCT_API = "http://localhost:8080/user";
  const DELETE_PRODUCT_API = "http://localhost:8080/api/products";
  const CATEGORY_API = "http://localhost:8080/category";

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCT_API);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_API);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // Add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.image) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("image", form.image); // file upload

      const res = await fetch(PRODUCT_API, {
        method: "POST",
        body: formData, // no JSON headers
      });

      if (!res.ok) throw new Error("Failed to add product");

      const result = await res.json();

      setProducts([...products, result.product]);

      setForm({
        title: "",
        price: "",
        image: null,
        description: "",
        category: "",
      });

    } catch (error) {
      alert("Error adding product");
    }

    setLoading(false);
  };

  // Delete product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${DELETE_PRODUCT_API}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Product Manager
      </h1>

      {/* Add Product */}
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[70%] lg:w-[60%] bg-white shadow-lg rounded-lg p-6 mb-10"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Product title"
            value={form.title}
            onChange={handleChange}
            className="border rounded-md px-4 py-2"
          />

          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={form.price}
            onChange={handleChange}
            className="border rounded-md px-4 py-2"
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded-md px-4 py-2"
          />

          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded-md px-4 py-2"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded-md px-4 py-2"
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
          className="mt-5 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Product Table */}
      <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-center">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-indigo-50">
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3">
                    <img
                      src={`http://localhost:8080/${item.image}`}
                      alt={item.title}
                      className="w-14 h-14 object-contain rounded-md border"
                    />
                  </td>

                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3 text-center">{item.category}</td>
                  <td className="px-4 py-3">₹{item.price}</td>
                  <td className="px-4 py-3">{item.description}</td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="text-red-500 hover:text-red-700 text-2xl"
                    >
                      <TiDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 font-medium"
                >
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
