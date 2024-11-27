const jwt = require('jsonwebtoken');

const generateToken = (email, role, secret, expiresIn = '30d') => {
    return jwt.sign({ id: email, role }, secret, { expiresIn });
};

module.exports = { generateToken };
