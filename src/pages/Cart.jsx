import React, { useState } from 'react';

function ProductList() {
  // Sample products with images
  const products = [
    { id: 1, name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 39.99, image: 'https://via.placeholder.com/150' },
  ];

  // Cart state
  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded shadow p-4 hover:shadow-lg transition"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-4 rounded"
            />

            {/* Product Name */}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

            {/* Product Price */}
            <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-white p-4 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  {item.name} x {item.quantity}
                </div>
                <div className="flex items-center gap-4">
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() =>
                      setCart(cart.filter((cartItem) => cartItem.id !== item.id))
                    }
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 font-bold text-lg">
              Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
