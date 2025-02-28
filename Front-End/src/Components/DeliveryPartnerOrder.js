import "./CSS/Delivery_Partner_Order.css";
import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceOrder from "./PlaceOrder";
import OrderDetailsPopup from "./OrderDetailsPopup ";
import { toast } from "react-toastify";
import { useContext } from 'react';
import { AuthContext } from "./AuthContext";
import { motion } from "framer-motion";
import { FaUser,FaBars } from "react-icons/fa";

export default function DeliveryPartnerOrder(){
      const userAuth=useContext(AuthContext);
      const userId=userAuth.userId;
      const userName=userAuth.userName;
    // const userId=localStorage.getItem("userId")
    // const userName=localStorage.getItem("userName")
    const [isAddOrderPopUp,setIsAddOrderPopUp]=useState(false);
    const [pickOrder,setPickOrder]=useState(false);
    const [isComplete,setIsComplete]=useState(false);
    const [changes,setChanges]=useState(false);
    const [orderDetailsPopup,setOrderDetailsPopup]=useState(false)
    const [deliveryDetails,setDeliveryDetails]=useState(" ");
    const [displayOrder,setDisplayOrder]=useState([])
    const [delivery,setDelivery]=useState();
    const navigate =useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    
    useEffect(() => {
        axios.get("https://delivery-orders-management-backend.onrender.com/api/user")
          .then((response) => {
            console.log("Received data:", response.data);
            if (Array.isArray(response.data)) {
              setDisplayOrder(response.data);
            } else {
              console.error("Data is not an array:", response.data);
              setDisplayOrder([]); // Prevent errors
            }
          })
          .catch((error) => console.error("Error fetching data:", error));
      }, [changes]);



    // Pcik Order **********************************************************************************
    const handlePickDelivery = async () => {
      const updateData={
        order_pickup_time: new Date().toLocaleTimeString(),
        delivery_boy: userName,
        order_status: "Out for delivery",
        delivery_partner_id:userId,
      }
      try{
        await axios.put(`https://delivery-orders-management-backend.onrender.com/api/orders/${delivery}`, updateData)
        toast.success("✅ Delivery Picked Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setChanges(prev=>!prev)
      } catch (error){
        console.error("Error updating order:", error);
        alert("an error occured")
      }
      setPickOrder(false)
      console.log(delivery.seller_name+" "+userId);
    };

    const pickDelivery=(order)=> {
      setDelivery(order);
      setPickOrder(true)
    }

    // Complete Order **************************************************************************************************
    const handleCompletekDelivery = async () => {
      const updateData={
        order_complete_time: new Date().toLocaleTimeString(),
        order_status: "Completed",
      }
      try{
        await axios.put(`https://delivery-orders-management-backend.onrender.com/api/orders/${delivery}`, updateData)
        toast.success("✅ Delivery Completed Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setChanges(prev=>!prev)
        setIsComplete(false)
      } catch (error){
        console.error("Error updating order:", error);
        alert("an error occured")
      }
    };

    const completekDelivery=(order)=> {
      setDelivery(order);
      setIsComplete(true)
    }

    const handelDeliveryDetails=(order)=> {
      setDeliveryDetails(order)
      setOrderDetailsPopup(true)
    }
    // function exp(){
    //   console.log("kya baat hai")
    // }
    return (
        <>
            <div className="navbar1-seller-overlay">
                <nav className="navbar1-seller">
                    <button className="navbar1-seller-menu-btn" >
                        <p>Delivery Orders</p>
                    </button>
                    {/* <div>
                    <Notification ></Notification>
                    </div> */}
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
          <li><FaUser /> {userName}</li>
          <li onClick={() => navigate("/delivery_partner_page")}><MdDashboard /> Dashboard</li>
          <li onClick={() => navigate("/delivery_partner_order_page")}><MdDeliveryDining /> Delivery</li>
          <li onClick={() => navigate("/Settings1")}><IoIosSettings /> Settings</li>
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
                            <p>{userName}</p>
                        </div>
                    <nav className="seller-menu">
                        <div onClick={()=> navigate("/delivery_partner_page")}><MdDashboard /><p>Dashboard</p></div>
                        <div onClick={() => navigate("/delivery_partner_order_page")}><MdDeliveryDining /><p>Deliveries</p></div>
                        <div onClick={()=> navigate("/Settings1")}><IoIosSettings /><p>Settings</p></div>
                    </nav>
                    </aside>
                    <div className="seller-orders-container-content">
                        <div className="seller-orders-container-content-in">
                            {displayOrder!==0 && ( displayOrder.map((order)=> (
                                      <div className={`status- ${
                                        order.order_status === "Out for delivery" ? "inProcessing" : order.order_status.toLowerCase()
                                        }`}>
                                      <h3><strong>{order.seller_name}</strong> </h3>
                                      <p><strong>Products:</strong> {order.products}</p>
                                      <p><strong>Customer Address:</strong> {order.address}</p>
                                      <p><strong>Customer Contact:</strong> +{order.customer_no}</p>
                                      <p><strong>Delivery Status:</strong> <span className={`status ${
                      order.order_status === "Out for delivery" ? "inProcessing" : order.order_status.toLowerCase()
                      }`}>{order.order_status}</span></p>
                                      {order.order_status==="Pending" ?(
                                        <button onClick={()=> pickDelivery(order._id)} className="pick-btn">Pick Delivery</button>
                                      ) : order.order_status=== "Out for delivery" ? (
                                        <button onClick={()=> completekDelivery(order._id)} className="pick-btn">Complete Delivery?</button>
                                      ) : order.order_status=== "Completed" ?(
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

            {pickOrder && (
                    <div className="popup-overlay">
                    <div className="popup">
                      <h3>⚠ Warning</h3>
                      <p>
                        After picking this delivery, <strong>you will not be able to undo it</strong> and only <br />
                        <strong>you can complete this delivery.</strong>
                      </p>
                      <div className="popup-buttons">
                        <button className="confirm-btn" onClick={handlePickDelivery}>
                          Pick Order
                        </button>
                        <button className="cancel-btn" onClick={()=> setPickOrder(false)} >
                          Cancel
                        </button >
                      </div>
                    </div>
                  </div>
            )}
                      {isComplete && (
                    <div className="popup-overlay">
                    <div className="popup">
                      <h3>⚠ Warning</h3>
                      <p>
                        After completing or cancelling this delivery, <strong>you will not be able to undo it</strong>
                      </p>
                      <div className="popup-buttons">
                        <button className="confirm-btn" onClick={handleCompletekDelivery}>
                          Completed
                        </button>
                        <button className="cancel-btn" onClick={()=> setIsComplete(false)} >
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
