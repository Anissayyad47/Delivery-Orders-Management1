const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const Order = require("./ModelOrder"); // Import Order model


const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON data from the request body

// MongoDB Atlas connection string
const url = "mongodb+srv://sayyadanis356:anis123@cluster0.zt73u.mongodb.net/OrdersDB?retryWrites=true&w=majority&appName=Cluster0";

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
        const newOrder = new Order(req.body);
        await newOrder.save();
        console.log("recieved data :" +JSON.stringify(req.body));
        res.status(201).json({ message: "Order saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error saving order" });
    }
});

app.get("/api/user", async (req,res)=> {
try{
    const orders=await Order.find();
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
      }
    } catch (error) {
      res.status(500).json({ message: "Update failed", error });
    }
  });


app.listen(5500, () => {
    console.log("Server is running at port 5500");
});
