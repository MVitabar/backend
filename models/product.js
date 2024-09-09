const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Es opcional, por eso tiene un valor por defecto.
  category: { type: String, required: true },
  images: { type: [String] }, // Es opcional, por eso no tiene 'required: true'.
  freeShipping: { type: Boolean, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;