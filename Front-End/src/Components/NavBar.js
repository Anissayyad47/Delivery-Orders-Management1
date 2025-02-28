import "./CSS/NavBar.css"
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for menu

const Navbar = () => {

  return (
    <>
      <nav className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
        <h1 className="text-xl font-semibold">Delivery Order Management</h1>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
