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

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 20; // Default limit to 20 if not provided
    const page = parseInt(req.query.page) || 1; // Default page to 1 if not provided

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Find entries by userId, with pagination
    const entries = await Entry.find({ userid: userId })
      .limit(limit)
      .skip(skip)
      .exec();

    // Get total count of entries for this userId for frontend to handle pagination
    const totalEntries = await Entry.countDocuments({ userid: userId });

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
