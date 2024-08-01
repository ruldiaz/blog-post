// backend/middlewares/authenticateUser.js
const jwt = require('jsonwebtoken');
const User = require('../models/User/User');

const authenticateUser = async (req, res, next) => {
  try {
    // Retrieve the token from cookies or authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Set the user object in the request
    req.user = user;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
