import React from "react";
import "./CSS/OrderDetails .css"

const OrderDetails = ({ order, onComplete }) => {
  return (
    <div className="picked-order-card">
      <h2>Order Details</h2>
      <div className="picked-order-info">
        <p><strong>Seller Name:</strong> {order.seller_name}</p>
        <p><strong>Products:</strong> {order.products.join(", ")}</p>
        <p><strong>Customer Address:</strong> {order.address}</p>
        <p><strong>Customer Contact:</strong> {order.customer_no}</p>
        <p><strong>Distance:</strong> {order.distance} km</p>
        <p><strong>Charges:</strong> ₹{order.price}</p>
        <p className={`picked-status ${order.order_status.toLowerCase()}`}>
          <strong>Status:</strong> {order.order_status}
        </p>
      </div>
      <button 
        className="picked-complete-btn" 
        onClick={() => onComplete(order)}
        disabled={order.order_status === "Completed"}
      >
        {order.order_status === "Completed" ? "Delivered" : "Complete Delivery"}
      </button>
    </div>
  );
};


export default OrderDetails;
