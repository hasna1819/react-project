import React, { useEffect, useState } from "react";

function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/Orderdetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-10">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
        All Orders
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow-2xl backdrop-blur-xl bg-white/5 border border-white/10">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="sticky top-0 z-10 bg-black/60 backdrop-blur-md">
            <tr className="text-left uppercase tracking-wider text-xs text-gray-400">
              <th className="px-6 py-4">Customer Name</th>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Items</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-white/10 hover:bg-white/5 transition-all duration-300"
              >
                <td className="px-6 py-5 font-medium text-white">
                  {order.customer}
                </td>

                <td className="px-6 py-5 text-gray-400">
                  #{order._id.slice(-6)}
                </td>

                <td className="px-6 py-5">
                  {new Date(order.date).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-5 font-semibold text-amber-400">
                  ₹{order.total}
                </td>

                <td className="px-6 py-5">
                  <ul className="space-y-1 max-h-24 overflow-y-auto pr-2">
                    {order.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between text-xs text-gray-400"
                      >
                        <span>{item.name}</span>
                        <span>
                          x{item.qty} · ₹{item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDetails;
