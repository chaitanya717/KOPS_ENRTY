const mongoose = require("mongoose");

const paymentStatusSchema = new mongoose.Schema({
  status: { type: String, required: true },
  mode: { type: String, required: true },
});

const entrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  userid: { type: String, required: true },
  date: { type: String, required: true },
  starttime: { type: String },
  endtime: { type: String },
  hour: { type: String },
  mobile: { type: String, required: true },
  businessOption: { type: String, required: true },
  bag: { type: Number, required: true },
  rate: { type: Number, required: true },
  hrrate: { type: Number, required: true },
  hrcount: { type: Number, required: true },
  hrname: [String],
  Driver: { type: Boolean, default: true },
  diesel: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentStatus: paymentStatusSchema,
});

module.exports = mongoose.model("entry_buisness", entrySchema);
