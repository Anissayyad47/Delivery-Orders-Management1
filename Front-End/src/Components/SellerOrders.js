import "./CSS/Seller_Order.css"
import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import PlaceOrder from "./PlaceOrder";
import { toast } from "react-toastify";
import OrderDetailsPopup from "./OrderDetailsPopup ";
import { useContext } from 'react';
import { AuthContext } from "./AuthContext";
import { FaUser, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";


export default function SellerOrders(){
  const userAuth=useContext(AuthContext);
  // const sellerId=userAuth.sellerId;
  const sellerName=userAuth.sellerName;
    // const userId=localStorage.getItem("userId")
    // const userName=localStorage.getItem("userName")
    const [isAddOrderPopUp,setIsAddOrderPopUp]=useState(false);
    const [cancelOrder,setCancelOrder]=useState(false);
    const [orderDetailsPopup,setOrderDetailsPopup]=useState(false)
    const [deliveryDetails,setDeliveryDetails]=useState(" ");
    const [changes,setChanges]=useState()
    const [delivery,setDelivery]=useState();
    const [displayOrder,setDisplayOrder]=useState([])
    const navigate =useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    

    useEffect(() => {
        axios.get("http://localhost:5500/api/user")
          .then((response) => {
            console.log("Received data:", response.data);
            if (Array.isArray(response.data)) {
              setDisplayOrder(response.data);
            } else {
              setDisplayOrder([]); // Prevent errors
            }
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, [changes]);

    const handleCancelDelivery =async () => {
        const updateData={
            order_complete_time: new Date().toLocaleTimeString(),
            order_status: "Cancelled",
          }
          try{
            await axios.put(`http://localhost:5500/api/orders/${delivery}`, updateData)
            toast.success("✅ Delivery Cancelled Successfully!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setChanges(prev=>!prev)
            setCancelOrder(false)
          } catch (error){
            console.error("Error updating order:", error);
            alert("an error occured")
          }
    };

    const handleCanceDeliveryPopup=(order)=> {
        setCancelOrder(true);
        setDelivery(order);
    }

    const handelDeliveryDetails=(order)=> {
      setDeliveryDetails(order)
      setOrderDetailsPopup(true)
    }
    return (
        <>
            <div className="navbar1-seller-overlay">
                <nav className="navbar1-seller">
                    <button className="navbar1-seller-menu-btn" >
                        <p>Delivery Orders</p>
                    </button>
                    <button className="navbar1-seller-add-delivery-btn" onClick={()=> setIsAddOrderPopUp(true)}>Add Delivery</button>
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

            <div className="seller-orders-container-overlay">
                <div className="seller-orders-container">
                    <aside className="seller-sidebar">
                        <div className="seller-profile">
                            <FaUserAlt />
                            <p>{sellerName}</p>
                        </div>
                    <nav className="seller-menu">
                        <div onClick={()=> navigate("/seller_page")}><MdDashboard /><p>Dashboard</p></div>
                        <div onClick={() => navigate("/seller_orders")}><MdDeliveryDining /><p>Deliveries</p></div>
                        <div onClick={() => navigate("/Settings")}><IoIosSettings /><p>Settings</p></div>
                    </nav>
                    </aside>
                    <div className="seller-orders-container-content" >
                        <div className="seller-orders-container-content-in" >
                            {displayOrder!==0 && ( displayOrder.map((order)=> (
                                      <div className={`status- ${
                                        order.order_status === "Out for delivery" ? "inProcessing" : order.order_status.toLowerCase()
                                        }`}>
                                      <h3><strong>{order.seller_name}</strong> </h3>
                                      <p><strong>Products:</strong> {order.products+", "}</p>
                                      <p><strong>Customer Address:</strong> {order.address}</p>
                                      <p><strong>Customer Contact:</strong> +{order.customer_no}</p>
                                      <p><strong>Delivery Status:</strong> <span className={`status ${
                      order.order_status === "Out for delivery" ? "inProcessing" : order.order_status.toLowerCase()
                      }`}>{order.order_status}</span></p>
                                                                            {order.order_status==="Pending" ?(
                                                                              <button  className="pick-btn-cancel" onClick={()=> handleCanceDeliveryPopup(order._id)}>Cancel Delivery</button>
                                                                            ) : order.order_status=== "Out for delivery" ? (
                                                                              <button  className="pick-btn-cancel" onClick={()=> handleCanceDeliveryPopup(order._id)}>Cancel Delivery</button>
                                                                            ): order.order_status=== "Completed" ?(
                                                                              <div className="complete-delivery"><FaCheckCircle className="complete-delivery-in"></FaCheckCircle></div>
                                                                            ) :order.order_status=== "Cancelled" && (
                                                                              <div className="cancelled-delivery"><MdCancel className="cancelled-delivery-in"></MdCancel></div>
                                                                            )}
                                                                            <button onClick={()=> handelDeliveryDetails(order)} className="pick-btn-details">Details</button>
                                                                          </div>
                                                                          
                            )))}
                        </div>
                    </div>

                </div>
            </div>
            {isAddOrderPopUp && (
                <PlaceOrder setIsAddOrderPopUp={()=> setIsAddOrderPopUp(false)}></PlaceOrder>
            )}

            {cancelOrder && (
                <div className="popup-overlay">
                <div className="popup">
                  <h3>⚠ Warning</h3>
                  <p>
                    <strong>Conform Cancel Delivery?</strong>
                  </p>
                  <div className="popup-buttons">
                    <button className="confirm-btn" onClick={handleCancelDelivery}>
                      Cancel Delivery
                    </button>
                    <button className="cancel-btn" onClick={()=> setCancelOrder(false)} >
                      Cancel
                    </button >
                  </div>
                </div>
              </div>
            )}


            {orderDetailsPopup && (
              <>
              <OrderDetailsPopup deliveryDetails={deliveryDetails} onClose={()=>setOrderDetailsPopup(false)}></OrderDetailsPopup>
              </>
            )}
        </>
    )
}