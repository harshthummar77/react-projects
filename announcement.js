const express = require('express');
const auth = require('../middleware/auth');
const Attendance = require('../models/Attendance');

const Router = express.Router();

// Mark attendance
router.post('/', auth, async (req, res) => {
    const { studentId, status } = req.body;
    try {
        const attendance = new Attendance({ studentId, status });
        await attendance.save();
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get attendance by date
router.get('/', auth, async (req, res) => {
    const { date } = req.query;
    try {
        const attendanceRecords = await Attendance.find({ date });
        res.json(attendanceRecords);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
const express = require('express');
const auth = require('../middleware/auth');
const Announcement = require('../models/Announcement');

const router = express.Router();

// Create an announcement
router.post('/', auth, async (req, res) => {
    const { content } = req.body;

    try {
        const announcement = new Announcement({ teacherId: req.user.id, content });
        await announcement.save();
        res.json(announcement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all announcements
router.get('/', auth, async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
