const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true, min: 10, max: 50 },
    description: { type: String, required: true, min: 20, max: 1000 },
    data: { type: Date, default: Date.now, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    infoSeller: { type: String, required: true },
});

module.exports = mongoose.model('Ad', adSchema);