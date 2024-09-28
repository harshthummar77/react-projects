const express = require('express');
const auth = require('../middleware/auth');
const Homework = require('../models/Homework');

const router = express.Router();

// Create a new homework assignment
router.post('/', auth, async (req, res) => {
    const { title, description, dueDate } = req.body;

    try {
        const homework = new Homework({
            teacherId: req.user.id,
            title,
            description,
            dueDate
        });
        await homework.save();
        res.json(homework);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit homework
router.post('/:homeworkId/submit', auth, async (req, res) => {
    const { content } = req.body;

    try {
        const homework = await Homework.findById(req.params.homeworkId);
        homework.submissions.push({ studentId: req.user.id, content });
        await homework.save();
        res.json(homework);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get homework assignments (teacher view)
router.get('/', auth, async (req, res) => {
    try {
        const homeworks = await Homework.find({ teacherId: req.user.id });
        res.json(homeworks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get homework assignments (student view)
router.get('/student', auth, async (req, res) => {
    try {
        const homeworks = await Homework.find({ 'submissions.studentId': req.user.id });
        res.json(homeworks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
