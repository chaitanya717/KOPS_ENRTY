const express = require("express");
const Entry = require("../models/entryBus");
const router = express.Router();

// Create new entry
router.post("/", async (req, res) => {
  try {
    const entry = new Entry(req.body);
    const savedEntry = await entry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all entries
router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/userhr/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 20; // Default limit to 20 if not provided
    const page = parseInt(req.query.page) || 1; // Default page to 1 if not provided
    const skip = (page - 1) * limit;

    // Retrieve the startDate and endDate from query parameters as strings, if provided
    const startDate = req.query.startDate; // e.g., "2024-03-01"
    const endDate = req.query.endDate; // e.g., "2024-03-12"
    
    // Initialize filter object with userId
    let filter = { userid: userId };

    // If both startDate and endDate are provided, apply range filter
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      // If only startDate is provided, get entries from that date onward
      filter.date = { $gte: startDate };
    } else if (endDate) {
      // If only endDate is provided, get entries up to that date
      filter.date = { $lte: endDate };
    }

    // Find entries by userId and date with pagination
    const entries = await Entry.find(filter)
      .limit(limit)
      .skip(skip)
      .exec();

    // Get total count of entries for this userId and date range
    const totalEntries = await Entry.countDocuments(filter);

    res.json({
      entries,
      totalEntries,
      currentPage: page,
      totalPages: Math.ceil(totalEntries / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 20; // Default limit to 20 if not provided
    const page = parseInt(req.query.page) || 1; // Default page to 1 if not provided
    const skip = (page - 1) * limit;

    // Retrieve the date from query parameters as a string, if provided
    const dateStr = req.query.date; // e.g., "2024-03-12"
    
    // Initialize filter object with userId
    let filter = { userid: userId };

    // If a date string is provided, apply equality filter
    if (dateStr) {
      // Directly add the date filter as a string comparison
      filter.date = dateStr; // Assuming date is stored as a string in the format YYYY-MM-DD
    }

    // Find entries by userId and date with pagination
    const entries = await Entry.find(filter)
      .limit(limit)
      .skip(skip)
      .exec();

    // Get total count of entries for this userId and specific date
    const totalEntries = await Entry.countDocuments(filter);

    res.json({
      entries,
      totalEntries,
      currentPage: page,
      totalPages: Math.ceil(totalEntries / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Read a single entry by ID
router.get("/:id", async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an entry by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEntry)
      return res.status(404).json({ message: "Entry not found" });
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
    if (!deletedEntry)
      return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
