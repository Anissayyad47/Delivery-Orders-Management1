const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  seller_name:String,
  address: String,
  products: [String],
  customer_no: String,
  distance: Number,
  price: Number,
  order_place_time: String,
  order_pickup_time: String,
  order_complete_time: String,
  delivery_boy: String,
  order_status: String,
});

module.exports = mongoose.model("Order", OrderSchema);
