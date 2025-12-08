// OrderDetails.jsx
import React, { useEffect, useState } from "react";

function OrderDetails({ orderId }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = orderId
      ? `http://localhost:8080/orders/${orderId}`
      : "http://localhost:8080/orders";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching order:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error}</h3>;
  if (!order || (Array.isArray(order) && order.length === 0))
    return <h3>No orders found</h3>;

  const ordersArray = Array.isArray(order) ? order : [order];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>

      {ordersArray.map((o) => (
        <div key={o._id} style={{ marginBottom: "30px" }}>
          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th>Order ID</th>
                <td>{o._id}</td>
              </tr>
              <tr>
                <th>Customer</th>
                <td>{o.customer}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{o.date}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{o.status}</td>
              </tr>
              <tr>
                <th>Total</th>
                <td>{o.total}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: "20px" }}>Items</h3>
          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {o.items?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
