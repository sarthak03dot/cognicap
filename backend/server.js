// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');



dotenv.config();
connectDB();
 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
