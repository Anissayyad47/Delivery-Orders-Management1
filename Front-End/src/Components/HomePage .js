import React from "react";
import "./CSS/HomePage .css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from 'react';
import { AuthContext } from "./AuthContext";

const HomePage = () => {
    const navigate =useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [deliveryLogin,setDeliveryLogin]=useState(false);
    const [sellerLogin,setSellerLogin]=useState(false);
    const userAuth=useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        conform_password: "",
    });

    const handleChange =(e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
    //   Delivery Partner Register *****************************************************************
      const handleRegister =async (e) => {
        e.preventDefault();
        if (isRegister && formData.password !== formData.conform_password) {
          alert("Passwords do not match!");
          return;
        }
        try{
            const response=await axios.post("http://localhost:5500/delivery_partner_register",formData)
            if(response.data.message==="User registered successfully"){
              toast.success("✅ User registered successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setDeliveryLogin(false)
              navigate("/delivery_partner_page");
          }

            // alert(response.data.message);
            // localStorage.setItem("userId",response.data.userId);
            // localStorage.setItem("userName",response.data.userName);
            userAuth.setUserId(response.data.userId)
            userAuth.setUserName(response.data.userName)

        }catch (error){
            if (error.response?.data?.error || "User Already Exists") {
              toast.error("User Already Exists", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
              })
          } else {
            alert("An error occurred");
          }
        }
      };

    //   Delivery Partner Login *****************************************************************
      const handleSubmit= async(e)=> {
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:5500/delivery_partner_login",formData);
            if(response.data.message==="Login successfully"){
              toast.success("✅ Login successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setDeliveryLogin(false)
              userAuth.setUserId(response.data.userId)
              userAuth.setUserName(response.data.userName)
          } else if(response.data.message==="invalid username and password"){
            toast.error("invalid username and password", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          } else {
            alert(response.data.message);
          }
            if(response.data.message==="Login successfully"){
                navigate("/delivery_partner_page");
            }
        }catch(error){
            alert(error.response?.data?.error || "An error occurred");
        }
      }


      //   Seller  Partner Register *****************************************************************
      const handleSellerRegister =async (e) => {
        e.preventDefault();
        if (isRegister && formData.password !== formData.conform_password) {
          alert("Passwords do not match!");
          return;
        }
        try{
            const response=await axios.post("http://localhost:5500/seller_partner_register",formData)
            // alert(response.data.message)
            if(response.data.message==="User registered successfully"){
              toast.success("✅ User registered successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setDeliveryLogin(false)
              navigate("/seller_page");
              userAuth.setSellerId(response.data.userId)
              userAuth.setSellerName(response.data.userName)
          }
            // localStorage.setItem("userId",response.data.userId);
            // localStorage.setItem("userName",response.data.userName);
        }catch (error){
          if (error.response?.data?.error || "User Already Exists") {
            toast.error("User Already Exists", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        } else {
          alert("An error occurred");
        }
        }
      };

    //   Seller Partner Login *****************************************************************
      const handleSellerSubmit= async(e)=> {
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:5500/seller_partner_login",formData);
            // alert(response.data.message);
            if(response.data.message==="Login successfully"){
              toast.success("✅ Login successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setDeliveryLogin(false)
              userAuth.setSellerId(response.data.userId)
              userAuth.setSellerName(response.data.userName)
          } else if(response.data.message==="invalid username and password"){
            toast.error("invalid username and password", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          } else {
            alert(response.data.message);
          }

            // localStorage.setItem("userId",response.data.userId);
            // localStorage.setItem("userName",response.data.userName);

            if(response.data.message==="Login successfully"){
                navigate("/seller_page");
            }
        }catch(error){
            alert(error.response?.data?.error || "An error occurred");
            alert(error.response?.data?.error);
        }
      }

  return (
    <>
    <div className="home-container">
      <h1 className="home-title">Continue As</h1>
      <div className="home-role-options">
        <button className="home-delivery" onClick={() => setDeliveryLogin(true)}>
          Delivery Partner
        </button>
        <button className="home-seller" onClick={()=> setSellerLogin(true)}>
          Seller
        </button>
      </div>
      <div className="warning-backend">
      <p>If you encounter any errors, please try again after 1–2 minutes. This website is hosted on Render, and the backend may take some time to restart if it was in sleep mode</p>
    </div>
    </div>

    {deliveryLogin && (
        <div className="delivery-partner-popup-overlay">
        {!isRegister && (
            <div className="delivery-partner-popup-container">
              <h2>Delivery Partner</h2>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="delivery-partner-login">Login</button>
              </form>
              <p onClick={() => setIsRegister(!isRegister)} className="delivery-partner-switch-link">
              Already have an account? Login
              </p>
              <button className="delivery-partner-close-btn" onClick={()=> setDeliveryLogin(false)}>X</button>
            </div>
        )}

        {isRegister && (
            <div className="delivery-partner-popup-container">
                <h2>Delivery Partner</h2>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
                <input
                  type="password"
                  name="conform_password"
                  placeholder="Confirm Password"
                  value={formData.conform_password}
                  onChange={handleChange}
                  required
                />
              <button type="submit" className="delivery-partner-login">Register</button>
            </form>
            <p onClick={() => setIsRegister(!isRegister)} className="delivery-partner-switch-link">
            Don't have an account? Register
            </p>
            <button className="delivery-partner-close-btn" onClick={()=> setDeliveryLogin(false)}>X</button>
          </div>
        )}
          
        </div>
    )}

    {/* Seller Login Register ******************************************************************************************8 */}
    {sellerLogin && (
               <div className="delivery-partner-popup-overlay">
               {!isRegister && (
                   <div className="delivery-partner-popup-container">
                     <h2>Seller</h2>
                     <h2>Login</h2>
                     <form onSubmit={handleSellerSubmit}>
                       <input
                         type="text"
                         name="username"
                         placeholder="Username"
                         value={formData.username}
                         onChange={handleChange}
                         required
                       />
                       <input
                         type="password"
                         name="password"
                         placeholder="Password"
                         value={formData.password}
                         onChange={handleChange}
                         required
                       />
                       <button type="submit" className="delivery-partner-login">Login</button>
                     </form>
                     <p onClick={() => setIsRegister(!isRegister)} className="delivery-partner-switch-link">
                     Already have an account? Login
                     </p>
                     <button className="delivery-partner-close-btn" onClick={()=> setSellerLogin(false)}>X</button>
                   </div>
               )}
       
               {isRegister && (
                   <div className="delivery-partner-popup-container">
                    <h2>Seller</h2>
                   <h2>Register</h2>
                   <form onSubmit={handleSellerRegister}>
                     <input
                       type="text"
                       name="username"
                       placeholder="Username"
                       value={formData.username}
                       onChange={handleChange}
                       required
                     />
                     <input
                       type="password"
                       name="password"
                       placeholder="Password"
                       value={formData.password}
                       onChange={handleChange}
                       required
                     />
                       <input
                         type="password"
                         name="conform_password"
                         placeholder="Confirm Password"
                         value={formData.conform_password}
                         onChange={handleChange}
                         required
                       />
                     <button type="submit" className="delivery-partner-login">Register</button>
                   </form>
                   <p onClick={() => setIsRegister(!isRegister)} className="delivery-partner-switch-link">
                   Don't have an account? Register
                   </p>
                   <button className="delivery-partner-close-btn" onClick={()=> setSellerLogin(false)}>X</button>
                 </div>
               )}
              </div>
    )}

    </>
  );
};

export default HomePage;
