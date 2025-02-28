import "./CSS/Seller_Page.css";
import { FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceOrder from "./PlaceOrder";
import { useContext } from 'react';
import { AuthContext } from "./AuthContext";
import { motion } from "framer-motion";
import { FaUser,FaBars } from "react-icons/fa";


export default function SellerPage(){
    const navigate =useNavigate();
    const userAuth=useContext(AuthContext);
    const sellerId=userAuth.sellerId;
    const sellerName=userAuth.sellerName;
    // const userName=localStorage.getItem("userName")
    // const userId=localStorage.getItem("userId")
    const [orderList,setOrderLsit]=useState([]);
    const [charges,setCharges]=useState(0);
    const [isAddOrderPopUp,setIsAddOrderPopUp]=useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

      useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get(`https://delivery-orders-management-backend.onrender.com/sellerOrder/${sellerId}`);
            setOrderLsit(response.data);
            const total = response.data.reduce((sum, order) => sum + (order.price || 0), 0);
            setCharges(total);  // Fix: setOrderLsit → setOrderList
          } catch (error) {
            alert("Failed to get orders from server");
          }
        };
      
        fetchOrders(); // Call the async function inside useEffect
      }, [sellerId]); // Dependency array ensures it runs when userId changes
      
    return (
        <>
                <div className="navbar1-seller-overlay">
            <nav className="navbar1-seller">
            <button className="navbar1-seller-menu-btn" >
                <p>Delivery Orders</p>
            </button>
            </nav>
        </div>

      <div className="sidebar-container">
      {/* Button to open sidebar */}
      <button className="menu-btn" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>

      {/* Sidebar with animation */}
      <motion.div
        className="sidebar"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <ul>
          <li><FaUser /> {sellerName}</li>
          <li onClick={() => navigate("/seller_page")}><MdDashboard /> Dashboard</li>
          <li onClick={() => navigate("/seller_orders")}><MdDeliveryDining /> Delivery</li>
          <li onClick={() => navigate("/Settings")}><IoIosSettings /> Settings</li>
        </ul>
      </motion.div>

      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>


      <div className="seller-container-overlay">
      <div className="seller-container">
      {/* Sidebar */}
      <aside className="seller-sidebar">
        <div className="seller-profile">
          <FaUserAlt />
          <p>{sellerName}</p>
        </div>
        <nav className="seller-menu">
          <div onClick={() => navigate("/seller_page")}><MdDashboard /><p>Dashboard</p></div>
          <div onClick={() => navigate("/seller_orders")}><MdDeliveryDining /><p>Deliveries</p></div>
          <div onClick={() => navigate("/Settings")}><IoIosSettings /><p>Settings</p></div>
        </nav>
      </aside>

      {/* Main Dashboard Content */}


      <main className="seller-dashboard">
        {/* Your dashboard content goes here */}
      <div className="delivery-container">
      <h2>Today's Deliveries</h2>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Products</th>
            <th>Customer Address</th>
            <th>Delivery Boy Name</th>
            <th>Status</th>
            <th>Delivery Charges</th>
          </tr>
        </thead>
        <tbody>
          {orderList.length===0 ? (
            <h1>No Delivery Found</h1>
          ) : (
            orderList.map((delivery, index) => (
              <tr key={index}>
                <td>{delivery.products}</td>
                <td>{delivery.address}</td>
                <td>{delivery.delivery_boy}</td>
                <td className={`status ${
                      delivery.order_status === "Out for delivery" ? "inProcessing" : delivery.order_status.toLowerCase()
                      }`}>{delivery.order_status}</td>
                <td>₹{delivery.price}</td>
              </tr>
            ))
          )}
          
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="total-label">Total Deliveries:</td>
            <td>{orderList.length}</td>
          </tr>
          <tr>
            <td colSpan="4" className="total-label">Total Charges:</td>
            <td>₹{charges}</td>
          </tr>
          <tr>
            <td colSpan="5">
              <button className="add-delivery-btn" onClick={()=> setIsAddOrderPopUp(true)}>Add Delivery</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

                    {/* This Months Deliveries */}
      <div className="delivery-container">
      <h2>This Month's Deliveries</h2>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Products</th>
            <th>Customer Address</th>
            <th>Delivery Boy Name</th>
            <th>Status</th>
            <th>Delivery Charges</th>
          </tr>
        </thead>
        <tbody>
        {orderList.length===0 ? (
            <h1>No Delivery Found</h1>
          ) : (
            orderList.map((delivery, index) => (
                <tr key={index}>
                <td>{delivery.products}</td>
                <td>{delivery.address}</td>
                <td>{delivery.delivery_boy}</td>
                <td className={`status ${
                      delivery.order_status === "Out for delivery" ? "inProcessing" : delivery.order_status.toLowerCase()
                      }`}>{delivery.order_status}</td>
                <td>₹{delivery.price}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="total-label">Total Deliveries:</td>
            <td>{orderList.length}</td>
          </tr>
          <tr>
            <td colSpan="4" className="total-label">Total Charges:</td>
            <td>₹{charges}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    </main>
    </div>
    </div>
    {isAddOrderPopUp && (
      <PlaceOrder setIsAddOrderPopUp={()=> setIsAddOrderPopUp(false)}></PlaceOrder>
    )}
        </>
    )
}
