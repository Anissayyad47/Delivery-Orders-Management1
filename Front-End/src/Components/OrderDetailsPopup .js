import React from "react";
import "./CSS/OrderDetailsPopup.css"

const OrderDetailsPopup = ({ deliveryDetails, onClose }) => {
  if (!deliveryDetails) return null;

  return (
    <div className="order-details-popup-overlay" onClick={onClose}>
      <div className="order-details-popup-container" onClick={(e) => e.stopPropagation()}>
        <h2>Order Details</h2>
        <table>
          <tbody>
            <tr>
              <td><strong>Seller Name:</strong></td>
              <td>{deliveryDetails.seller_name}</td>
            </tr>
            <tr>
              <td><strong>Products:</strong></td>
              <td>{deliveryDetails.products.join(", ")}</td>
            </tr>
            <tr>
              <td><strong>Customer Address:</strong></td>
              <td>{deliveryDetails.address}</td>
            </tr>
            <tr>
              <td><strong>Customer No.:</strong></td>
              <td>{deliveryDetails.customer_no}</td>
            </tr>
            <tr>
              <td><strong>Delivery Boy:</strong></td>
              <td>{deliveryDetails.delivery_boy}</td>
            </tr>
            <tr>
              <td><strong>Distance:</strong></td>
              <td>{deliveryDetails.distance} km</td>
            </tr>
            <tr>
              <td><strong>Charges:</strong></td>
              <td>₹{deliveryDetails.price}</td>
            </tr>
            <tr>
              <td><strong>Order Place Time:</strong></td>
              <td>{deliveryDetails.order_place_time}</td>
            </tr>
            <tr>
              <td><strong>Order Pickup Time:</strong></td>
              <td>{deliveryDetails.order_pickup_time}</td>
            </tr>
            <tr>
              <td><strong>Order Complete Time:</strong></td>
              <td>{deliveryDetails.order_complete_time}</td>
            </tr>
            <tr>
              <td><strong>Order Status:</strong></td>
              <td className={`order-details-status ${deliveryDetails.order_status.toLowerCase()}`}>
                {deliveryDetails.order_status}
              </td>
            </tr>
          </tbody>
        </table>
        <button className="order-details-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderDetailsPopup;
