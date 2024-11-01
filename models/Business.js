const mongoose = require("mongoose");

const hrSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  Active: { type: Boolean, default: true },
  rate: { type: String, required: true },
});

const businessSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  userid: { type: String, required: true },
  businessType: { type: String, required: true },
  businessOption: [String],
  HR: [hrSchema],
  HrRate: { type: Number, required: true },
  Active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Business", businessSchema);
