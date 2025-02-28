const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
require("dotenv").config();
const Order = require("./ModelOrder"); // Import Order model
const Delivery_partner=require("./models/Delivery_partner");
const Seller_partner=require("./models/Seller_partner");


const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON data from the request body



const url=process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(url)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Failed to connect:", err));

// Route to handle GET request (for testing)
app.get("/", (req, res) => {
    res.send("Server is running");
});

// 📌 Route to store order in MongoDB
app.post("/add-order", async (req, res) => {
  try {
      const { newOrder, sellerId } = req.body; // Extracting newOrder and userId

      if (!sellerId) {
          return res.status(400).json({ error: "User ID is required" });
      }

      const orderData = new Order({
          ...newOrder,
          seller_id: sellerId, // Linking order with user
      });

      await orderData.save();
      console.log("Received data:", JSON.stringify(req.body));
      res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ error: "Error saving order" });
  }
});

//  Get Request ************************************************************************************
app.get("/api/user", async (req,res)=> {
try{
    const orders=await Order.find();
    res.json(orders);
}catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
})

// Seller Order Request
app.get("/sellerOrder/:userId", async (req,res)=> {
  const {userId}=req.params;
  try{
      const orders=await Order.find({seller_id:userId});
      res.json(orders);
  }catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  })

// Delivery Order Request
  app.get("/DeliveryOrder/:userId", async (req,res)=> {
    const {userId}=req.params;
    try{
        const orders=await Order.find({delivery_partner_id:userId});
        res.json(orders);
    }catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
    })


app.put("/api/orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(id,updatedData, { new: true });
      if (!updatedOrder) {
        console.log("order not found found")
        return res.status(404).json({ message: "Order not found" });
      } else {
        console.log("order updated successfuly")
        return res.status(201).json({ message: "Order updated successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: "Update failed", error });
    }
  });

  // Delivery Partner Register ***********************************************************************
app.post("/delivery_partner_register",async (req,res)=> {
  const {username,password,conform_password} =req.body
  try{
    const existsUser=await Delivery_partner.findOne({username})
    if(existsUser){
      return res.status(400).json({error:"User Already Exists"})
    }
    const newUser=new Delivery_partner({
      username:username,
      password:password,
      conform_password:conform_password,
    })
    const savedUser=await newUser.save();
    return res.status(201).json({message:"User registered successfully",userId:savedUser._id,userName:username})
  }catch (error){
    res.status(500).json({ error: "An error occurred while registering the user" });
  }
})

// Delivery Partner Login ***********************************************************************
app.post("/delivery_partner_login",async (req,res)=> {
  const {username,password}=req.body;
  try{
    const userExist=await Delivery_partner.findOne({username,password})
    if(userExist){
      return res.status(201).json({message:"Login successfully",userId:userExist._id, userName:username})
    }else {
      return res.status(201).json({message:"invalid username and password"})
    }
  }catch(error){
    res.status(500).json({ error: "An error occurred while Login the user" });
  }
})


// Seller partner Register ***********************************************************************
app.post("/seller_partner_register",async (req,res)=> {
  const {username,password,conform_password} =req.body
  try{
    const existsUser=await Seller_partner.findOne({username})
    if(existsUser){
      return res.status(400).json({error:"User Already Exists"})
    }
    const newUser=new Seller_partner({
      username:username,
      password:password,
      conform_password:conform_password,
    })
    const savedUser=await newUser.save();
    return res.status(201).json({message:"User registered successfully",userId:savedUser._id,userName:username})
  }catch (error){
    res.status(500).json({ error: "An error occurred while registering the user" });
  }
})


// Seller Partner Login  ***********************************************************************
app.post("/seller_partner_login",async (req,res)=> {
  const {username,password}=req.body;
  try{
    const userExist=await Seller_partner.findOne({username,password})
    if(userExist){
      return res.status(201).json({message:"Login successfully",userId:userExist._id,userName:username})
    }else {
      return res.status(201).json({message:"invalid username and password"})
    }
  }catch(error){
    res.status(500).json({ error: "An error occurred while Login the user" });
  }
})


app.listen(5500, () => {
    console.log("Server is running at port 5500");
});
