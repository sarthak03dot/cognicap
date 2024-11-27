const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db'); // Adjust the path to your db.js file
const User = require('../models/User'); // Adjust the path to your User model

dotenv.config(); // Load environment variables

const createSuperAdmin = async () => {
    try {
        await connectDB(); // Connect to MongoDB

        const userExists = await User.findOne({ email: 'admin@example.com' });
        if (userExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const user = new User({
            name: 'Super Admin',
            email: 'admin@example.com',
            password: 'password123', // Ideally, hash this password before saving
            isAdmin: true,
            role: 'superadmin'
        });

        await user.save();
        console.log('Super Admin created successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createSuperAdmin();
