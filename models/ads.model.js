const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  data: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  infoSeller: { type: String, required: true },
  image: { type: String, required: false },
});

module.exports = mongoose.model("Ad", adSchema);
