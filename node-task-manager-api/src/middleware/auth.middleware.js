const jwt = require('jsonwebtoken');
const env = require('../config/env');
const prisma = require('../config/db');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication token is missing.'
      });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Verify user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Authentication token has expired.'
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Invalid or corrupted authorization token.'
    });
  }
};

module.exports = { authenticateToken };
