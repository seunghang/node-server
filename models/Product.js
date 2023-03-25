const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  explanation: String,
  company: String,
  category: String,
});

const model = mongoose.model("Product", ProductSchema);

module.exports = model;
