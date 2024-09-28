const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get all students (for teacher dashboard)
router.get('/', auth, async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get student profile by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
