const express = require("express");
const router = express.Router();
const History = require("../models/History");

// Get all history reminders
router.get("/", async (req, res) => {
  try {
    const history = await History.find();
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history", error: err.message });
  }
});

// Delete all history
router.delete("/", async (req, res) => {
  try {
    await History.deleteMany({});
    res.status(200).json({ message: "All history deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting history", error: err.message });
  }
});

module.exports = router;