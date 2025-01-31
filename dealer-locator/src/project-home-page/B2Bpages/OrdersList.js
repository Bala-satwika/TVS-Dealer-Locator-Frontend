import React from 'react';
import './OrdersList.css'; // Updated styling

const OrdersList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <p id="no-orders-message">No orders available for the selected dealer.</p>; // Display message when no data is available
  }

  return (
    <div id="orders-container">
      <h2 id="orders-title">Orders List</h2>
      <ul id="orders-list">
        {orders.map((order) => (
          <li key={order.orderId} id={`order-item-${order.orderId}`} className="order-item">
            <div id="order-card">
              <div><strong>Order ID:</strong> {order.orderId}</div>
              <div><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</div>
              <div id="items-section">
                <strong>Items:</strong>
                {order.items && order.items.length > 0 ? (
                  <ul id="items-list">
                    {order.items.map((item, index) => (
                      <li key={index} id={`item-${index}`}>
                        <div><strong>Product:</strong> {item.product}</div>
                        <div><strong>Quantity:</strong> {item.quantity} units</div>
                        <div><strong>Status:</strong> {item.status}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p id="no-items-message">No items available for this order.</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;