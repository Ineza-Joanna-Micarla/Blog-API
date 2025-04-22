export const authorizeRole = (roles) => (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: `User role ${req.user.role} is not authorized to access this route` });
    }
  
    next();
  };