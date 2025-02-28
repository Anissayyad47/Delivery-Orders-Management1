const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    username:String,
    password: String,
    conform_password: String,
});

module.exports = mongoose.model("Seller_partner", OrderSchema);