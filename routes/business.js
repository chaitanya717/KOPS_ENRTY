const express = require('express');
const Business = require('../models/Business');
const router = express.Router();

// Create new business
router.post('/', async (req, res) => {
    try {
        const business = new Business(req.body);
        const savedBusiness = await business.save();
        res.status(201).json(savedBusiness);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all businesses
router.get('/', async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a single business by ID
router.get('/:id', async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) return res.status(404).json({ message: 'Business not found' });
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const limit = parseInt(req.query.limit) || 20; // Default limit to 20 if not provided
        const page = parseInt(req.query.page) || 1; // Default page to 1 if not provided

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Find businesses by userId, with pagination
        const businesses = await Business.find({ userid:userId })
            .limit(limit)
            .skip(skip)
            .exec();

        // Get total count of businesses for this userId for frontend to handle pagination
        const totalBusinesses = await Business.countDocuments({ userid : userId });

        res.json({
            businesses,
            totalBusinesses,
            currentPage: page,
            totalPages: Math.ceil(totalBusinesses / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a business by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBusiness = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBusiness) return res.status(404).json({ message: 'Business not found' });
        res.json(updatedBusiness);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a business by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBusiness = await Business.findByIdAndDelete(req.params.id);
        if (!deletedBusiness) return res.status(404).json({ message: 'Business not found' });
        res.json({ message: 'Business deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
