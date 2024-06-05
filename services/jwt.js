const jwt = require('jsonwebtoken');

const secret = 'your_jwt_secret'; // Use a strong secret in production

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '12h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports = {
    generateToken,
    verifyToken
};