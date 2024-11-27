const path = require('path');
require('dotenv').config({ path: ('../.env') }); // Adjust path as needed

const { generateToken } = require('../utils/jwtHelper'); // Adjust path based on your project structure

const secret = process.env.JWT_SECRET;
if (!secret) {
    console.error('Error: JWT_SECRET is not defined in your environment variables.');
    process.exit(1); // Exit with an error code
}

// Generate the token
const token = generateToken('admin@example.com', 'superadmin', secret);

// Log the token in Bearer format
console.log(`Generated Token: Bearer ${token}`);

// module.exports = { token };s
