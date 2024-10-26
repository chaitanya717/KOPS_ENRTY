const mongoose = require("mongoose");

const hrSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  Active: { type: Boolean, default: true },
});

const businessSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  userid: { type: String, required: true },
  businessType: { type: String, required: true },
  businessOption: [],
  HR: [hrSchema],
  Active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Business", businessSchema);
