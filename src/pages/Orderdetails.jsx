import React from 'react';

function Orderdetails() {
//   Sample data
  const orders = [
    { id: 1, customer: 'John Doe', product: 'Laptop', quantity: 2, price: 1200 },
    { id: 2, customer: 'Jane Smith', product: 'Smartphone', quantity: 1, price: 800 },
    { id: 3, customer: 'Alice Johnson', product: 'Headphones', quantity: 3, price: 150 },
  ];

  return (
    <div className="w-[90%] md:w-[80%] bg-white shadow-xl rounded-lg overflow-hidden ">

      <h2>Order Details</h2>
      <table className='w-full'>
        <thead className='"bg-indigo-600 text-white'>
          <tr>
          
            <th>Customer Name</th>
            <th>Shipping adrees</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
             
              <td>{order.customer}</td>
              <td>{order.shipping}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orderdetails;
