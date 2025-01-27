const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");
const History = require("../models/History");

// Get all reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reminders", error: err.message });
  }
});

// Add a new reminder
router.post("/", async (req, res) => {
  try {
    const newReminder = new Reminder(req.body);
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(500).json({ message: "Error adding reminder", error: err.message });
  }
});

// Update a reminder
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReminder = await Reminder.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res.status(200).json(updatedReminder);
  } catch (err) {
    res.status(500).json({ message: "Error updating reminder", error: err.message });
  }
});

// Delete a reminder
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReminder = await Reminder.findByIdAndDelete(id);
    if (!deletedReminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting reminder", error: err.message });
  }
});

// // Mark a reminder as taken
// router.post("/:id/taken", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const reminder = await Reminder.findById(id);

//     if (!reminder) {
//       return res.status(404).json({ message: "Reminder not found" });
//     }

//     // Mark as taken
//     reminder.taken = true;
//     await reminder.save();

//     // Move the reminder to history
//     const historyReminder = new History(reminder.toObject());
//     await historyReminder.save();

//     // Delete the reminder from the active list
//     await Reminder.findByIdAndDelete(id);

//     res.status(200).json({ message: "Reminder marked as taken and moved to history", reminder: historyReminder });
//   } catch (err) {
//     res.status(500).json({ message: "Error marking reminder as taken", error: err.message });
//   }
// });

// // Mark a reminder as skipped
// router.post("/:id/skipped", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const reminder = await Reminder.findById(id);

//     if (!reminder) {
//       return res.status(404).json({ message: "Reminder not found" });
//     }

//     // Mark as skipped
//     reminder.skipped = true;
//     await reminder.save();

//     // Move the reminder to history
//     const historyReminder = new History(reminder.toObject());
//     await historyReminder.save();

//     // Delete the reminder from the active list
//     await Reminder.findByIdAndDelete(id);

//     res.status(200).json({ message: "Reminder marked as skipped and moved to history", reminder: historyReminder });
//   } catch (err) {
//     res.status(500).json({ message: "Error marking reminder as skipped", error: err.message });
//   }
// });

// Mark reminder as taken
router.post("/:id/taken", async (req, res) => {
  try {
    const reminderId = req.params.id;
    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    reminder.taken = true;
    await reminder.save();

    res.status(200).json({ reminder });
  } catch (error) {
    console.error("Error marking reminder as taken:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mark reminder as skipped
router.post("/:id/skipped", async (req, res) => {
  try {
    const reminderId = req.params.id;
    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    reminder.skipped = true;
    await reminder.save();

    res.status(200).json({ reminder });
  } catch (error) {
    console.error("Error marking reminder as skipped:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;