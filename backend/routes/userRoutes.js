// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { verifyToken, isSuperAdmin, protect, authorize } = require('../middleware/authMiddleware');

// Super Admin can create Admin or User
router.post('/superadmin/create', verifyToken, authorize('superadmin'), async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = new User({
            name,
            email,
            password,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received:', req.body);

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error); // Log the error for debugging
        res.status(500).json({ message: error.message });

    }
});



// Admin can only create normal users
router.post('/admin/create', verifyToken, authorize('admin'), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = new User({
            name,
            email,
            password,
            role: 'user', // Admins can only create normal users
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
