import axios from "axios";
import { useState } from "react";
import { useContext } from 'react';
import { AuthContext } from "./AuthContext";

export default function PlaceOrder({setIsAddOrderPopUp}){
    const [displayOrder,setDisplayOrder]=useState([])
    const userAuth=useContext(AuthContext);
    const sellerId=userAuth.sellerId;
    const sellerName=userAuth.sellerName;

    const [inputOrder,setInputOrder]=useState({
            seller_name:sellerName,
            address: "",
            products: "",
            customer_no: "",
            distance: "",
            price: "",
            order_place_time: "",
            order_pickup_time: "",
            order_complete_time: "",
            delivery_boy: "",
            order_status: "Pending",
        })

        const handleChange = (e) => {
            setInputOrder({...inputOrder,[e.target.name]:e.target.value});
        };
    
        const handleOrderSubmit = async () => {
            if (!inputOrder.seller_name || !inputOrder.address || !inputOrder.customer_no || 
                !inputOrder.products || !inputOrder.distance || !inputOrder.price) {
              alert("Please fill in all required fields.");
              return;
            }
          
            setDisplayOrder([...displayOrder, inputOrder]); // Ensure using inputOrder instead of formData
            console.log("Order:", inputOrder);
          
            const newOrder = {
              ...inputOrder,
              customer_no: Number(inputOrder.customer_no),
              order_place_time: new Date().toLocaleTimeString(),
              products: inputOrder.products.split(",").map(p => p.trim()), 
              distance: Number(inputOrder.distance),
              price: Number(inputOrder.price),
              delivery_boy: "Not Picked Yet",
              order_pickup_time: "Not Picked Yet",
              order_complete_time: "Not Picked Yet",
              order_status: "Pending",
            };
          
            try {
              const response = await axios.post("https://delivery-orders-management-backend.onrender.com/add-order", {newOrder,sellerId});
              alert(response.data.message);
              setIsAddOrderPopUp(false);
              setInputOrder({
                seller_name: "",
                address: "",
                products: "",
                customer_no: "",
                distance: "",
                price: "",
              });
            } catch (error) {
              console.error("Error:", error);
              alert("Failed to place order");
            }
          };

    return(

    
    <div className="popup-overlay">
                <div className="add-order-popup-container">
                    <h2>Order Form</h2>
    
                    <label>Products:</label>
                    <input type="text" name="products" value={inputOrder.products} onChange={handleChange} />
    
                    <label>Customer Address:</label>
                    <textarea name="address" value={inputOrder.address} onChange={handleChange} />
    
                    <label>Customer Contact:</label>
                    <input type="number" name="customer_no" value={inputOrder.customer_no} onChange={handleChange} />
    
                    <label>Distance (km):</label>
                    <input type="number" name="distance" value={inputOrder.distance} onChange={handleChange} />
    
                    <label>Charges (Rs):</label>
                    <input type="number" name="price" value={inputOrder.price} onChange={handleChange} />
    
                    <div className="add-order-button-group">
                        <button className="add-order-place-order" onClick={handleOrderSubmit}>Place Order</button>
                        <button className="add-order-cancel" onClick={()=> setIsAddOrderPopUp(false)}>Cancel</button>
                    </div>
                </div>
            </div>
    )
}
