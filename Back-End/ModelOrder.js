const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  seller_id: {type:mongoose.Schema.Types.ObjectId,ref:"Seller_partner"},
  delivery_partner_id: {type:mongoose.Schema.Types.ObjectId,ref:"Delivery_partner"},
  seller_name:String,
  address: String,
  products: [String],
  customer_no: Number,
  distance: Number,
  price: Number,
  order_place_time: String,
  order_pickup_time: String,
  order_complete_time: String,
  delivery_boy: String,
  order_status: String,
});

module.exports = mongoose.model("Order", OrderSchema);
