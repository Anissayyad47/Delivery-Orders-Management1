import React from "react";
import "./CSS/SettingsPage .css"
import { FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SettingsPage1 = ({ onLogout }) => {
    const navigate =useNavigate();
    const userName=localStorage.getItem("userName")

    const handleLogout=()=> {
        localStorage.clear();
        navigate("/")
    }
  return (
    <>
    <div className="navbar1-seller-overlay">
        <nav className="navbar1-seller">
            <button className="navbar1-seller-menu-btn" >
                <p>Delivery Orders</p>
            </button>
        </nav>
    </div>
    <div className="seller-container-overlay">
      <div className="seller-container">
      {/* Sidebar */}
      <aside className="seller-sidebar">
        <div className="seller-profile">
          <FaUserAlt />
          <p>{userName}</p>
        </div>
        <nav className="seller-menu">
          <div onClick={() => navigate("/delivery_partner_page")}><MdDashboard /><p>Dashboard</p></div>
          <div onClick={() => navigate("/delivery_partner_order_page")}><MdDeliveryDining /><p>Deliveries</p></div>
          <div onClick={() => navigate("/Settings1")}><IoIosSettings /><p>Settings</p></div>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
    <main className="settings-seller-dashboard">
    <div className="settings-container">
      <h2>Account Settings shit</h2>
      <div className="settings-options">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </main>
    </div>
    </div>

    </>

  );
};

export default SettingsPage1;
