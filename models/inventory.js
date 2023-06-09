const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  productName: { type: String, required: true },
  mrp: { type: Number, required: true },
  sp: { type: Number, required: true },
  qty: { type: Number, required: true },
  images: [{ type: String }],
});

module.exports = mongoose.model('Inventory', inventorySchema);
