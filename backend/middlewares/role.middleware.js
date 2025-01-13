class RoleMiddleware {
    isBusiness(req, res, next) {
      if (req.user.roleId !== 1) {
        return res.status(403).json({ ok: false, error: 'Access restricted to businesses only' });
      }
      if (!req.user.businessId) {
        return res.status(403).json({ ok: false, error: 'User is not associated with any business' });
      }
      next();
    }
  }
  
  module.exports = new RoleMiddleware();
  
  