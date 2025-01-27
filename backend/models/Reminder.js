const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  medicineDescription: { type: String, default: "" },
  image: { type: String, default: null },
  time: { type: Date, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  taken: { type: Boolean, default: false },
  skipped: { type: Boolean, default: false },
  numberOfMedications: { type: Number, default: 1 },
  frequency: { type: String, default: "daily" },
});

module.exports = mongoose.model("Reminder", reminderSchema);