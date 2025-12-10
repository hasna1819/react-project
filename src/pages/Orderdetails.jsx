import React, { useEffect, useState } from "react";
import useOrderStore from "../OrderStore";

function OrderDetailsPage({ orderId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  const { orderDetails, addOrder } = useOrderStore();

  useEffect(() => {
    if (!orderId) {
      setError("No orderId provided");
      setOrder(null);
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchOrder = async () => {
      setLoading(true);
      setError(null);

      // 1️⃣ Check store first
      const existingOrder = orderDetails.find(
        (o) => String(o.id) === String(orderId)
      );

      if (existingOrder) {
        setOrder(existingOrder);
        setLoading(false);
        return;
      }

      // 2️⃣ Fetch from API
      try {
        const response = await fetch(`http://localhost:8080/orders/${orderId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const orderData = data.order || data;

        if (!isCancelled) {
          setOrder({ ...orderData, id: orderData.id || orderData._id }); // show immediately
          addOrder({ ...orderData, id: orderData.id || orderData._id }); // save to store
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || "Unknown error");
          setOrder(null);
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchOrder();

    return () => {
      isCancelled = true;
    };
  }, [orderId, addOrder, orderDetails]);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error}</h3>;
  if (!order) return <h3>No order found</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <tbody>
          <tr><th>Order ID</th><td>{order.id}</td></tr>
          <tr><th>Customer</th><td>{order.customer || order.customerName || "N/A"}</td></tr>
          <tr><th>Date</th><td>{order.date || order.createdAt || "N/A"}</td></tr>
          <tr><th>Status</th><td>{order.status || "N/A"}</td></tr>
          <tr><th>Total</th><td>{order.total || order.amount || 0}</td></tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "20px" }}>Items</h3>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th></tr>
        </thead>
        <tbody>
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td>{idx + 1}</td>
                <td>{item.name || item.productName || "N/A"}</td>
                <td>{item.qty ?? item.quantity ?? 0}</td>
                <td>{item.price ?? 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetailsPage;
