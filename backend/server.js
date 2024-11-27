// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // Handles both user and token-related routes
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Mount all user-related routes (including token generation)
app.use('/api/users', userRoutes);
app.use('/api', userRoutes);

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
