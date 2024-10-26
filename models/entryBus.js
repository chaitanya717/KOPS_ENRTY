const mongoose = require("mongoose");

const paymentStatusSchema = new mongoose.Schema({
  status: { type: String, required: true },
  mode: { type: String, required: true },
});

const entrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  userid: { type: String, required: true },
  date: { type: Date, required: true },
  mobile: { type: String, required: true },
  businessOption: { type: String, required: true },
  bag: { type: Number, required: true },
  rate: { type: Number, required: true },
  hrcount: { type: Number, required: true },

  hrname: [String],
  diesel: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentStatus: paymentStatusSchema,
});

module.exports = mongoose.model("entry_buisness", entrySchema);
