const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

// Verify token middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }
        req.userId = decoded.id;
        next();
    });
};

// Check if user is Super Admin
const isSuperAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role !== 'superAdmin') {
            return res.status(403).json({ message: 'Access denied.' });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
};

// Role-based authorization middleware
const authorize = (...roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied.' });
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error.' });
        }
    };
};

module.exports = { verifyToken, isSuperAdmin, authorize };
