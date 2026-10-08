const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Please authenticate first.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Access restricted to roles: [${allowedRoles.join(', ')}]. Your role '${req.user.role}' does not have permission.`
      });
    }

    next();
  };
};

module.exports = { requireRole };
