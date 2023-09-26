const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded; // Attach the user object to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error verifying access token:', error);
    res.status(403).json({ message: 'Invalid or expired access token' });
  }
};

module.exports = { authenticateToken };
