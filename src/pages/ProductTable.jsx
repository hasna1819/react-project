import React, {  useEffect, useState } from 'react'
import { TiDelete } from "react-icons/ti";
function ProductTable() {
  const [products, setProducts]= useState([]);
  const [form,setForm]= useState({
    title: "",
    price:"",
    image:"",
  });
  const [loading,setLoading]= useState(false);
  const user = 'http://localhost:8080/user';

  // Fetch all products
  const fetchproducts = async () => {
    try {
      const res = await fetch(user);
      const data = await res.json();
      setProducts(data);
     }catch (error){
      console.error ("Error fetching products:",error);
     }
  };
  // Handle input changes
  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value });
  };

  // Add new product

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.image){
      alert ("please fill all fields");
      return;
    } 
    setLoading(true);
    try {
      const res = await fetch(user,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(form),
    });

    if (!res.ok) throw new Error("failed to add products");

    const data = await res.json();

    //Update state with the new product

    setProducts([...products, data]);
    setForm({title: "", price:"", image:"",});
  } catch (error) {
    console.error("Error adding products:", error);
    alert("Error adding products");
  } setLoading(false);
};

  // Delete a product

  const deleteproduct  =async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (!confirmDelete) return;
    try{
      const res = await fetch(`${user}/${id}`,{
        method : "DELETE",
      });
      setProducts(products.filter((p) => p._id !== id));
       } catch (error) {
        alert("product deleted");
       }
      };
      // Delete a product
      const deleteProduct = async (id) => {
        const confirmdelete =window.confirm("Are you sure you want to delete");
        if (!confirmDelete) return;
        try {
          const res =await fetch(`${user}/${id}`, {method: "Delete" });
          if (!res.ok) throw new Error("failed to delete product");

          setProducts((prev) => prev.filter((p) => p._id !==id));
        }catch (error) {
          console.error(error);
          alert("Error deleting product");
        }
      };
      useEffect(() => {
        fetchproducts();
      },[]);

      return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Product Manager
          </h1>

          {/*Add Product */}


          <form 
          onSubmit={handleSubmit}
            className="w-[90%] md:w-[70%] lg:w-[60%]bg-white shadow-lg rounded-lg p-6 mb-10"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Add New Product
              </h2>
            
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
              type="text"
              name="title"
              placeholder='Product title'
              value={form.title}
              onChange={handleChange} 
              className='border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400'
              />
              <input 
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
              className='border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400'
               />
               <input 
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className='border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400'
               />
             </div>
             <button 
             type="submit"
             disabled={loading}
             className="mt-5 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
             >
              {loading ? "Adding..." : "Add product"}
             </button>
          </form>

          {/* Product Table */}

          <div className="w-[90%] md:[80%] lg:w-[70%] bg-white shadow-xl rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
              {products.length > 0 ? (
                products.map((item, index) => (
                  <tr
                  key={item._id}
                   className="border-b hover:bg-indigo-50 transition-colors duration-200"
                   >
                    <td className="px-4 py03 text-gray-700 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <img 
                      src={item.image}
                       alt={item.title}
                       className="w-14 h-14 object-contain rounded-md border mx-auto"
                        />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 text-left">
                      {item.title}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-600 text-left">
                      ₹{item.price}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                      onClick={() => deleteproduct(item._id)}
                      className='text-red-500 hover:text-red-700 text-2xl'
                      title="Delete product">
                        <TiDelete />
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                  colSpan="5"
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
    


export default ProductTable ;