const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

// Verify token middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token);

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err.name, err.message);
            return res.status(401).json({ message: `Unauthorized: ${err.message}` });
        }

        console.log('Decoded token:', decoded);
        req.email = decoded.email;
        next();
    });
};

// Role-based authorization middleware
const authorize = (...roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findOne(req.email);
            console.log('Authorize Middleware - User:', user);

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied.' });
            }

            next();
        } catch (error) {
            console.error('Authorization Middleware Error:', error);
            res.status(500).json({ message: 'Server error.' });
        }
    };
};

module.exports = { verifyToken, authorize };
