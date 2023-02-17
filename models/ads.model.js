const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  data: { type: Date, default: Date.now, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  infoSeller: { type: String, required: true },
});

module.exports = mongoose.model("Ad", adSchema);
