class RoleMiddleware {
    isBusiness(req, res, next) {
      console.log('?')
      if (req.user.roleId !== 1) {
        return res.status(403).json({ ok: false, error: 'Access restricted to businesses only' });
      }
      if (!req.user.businessId) {
        return res.status(403).json({ ok: false, error: 'User is not associated with any business' });
      }
      console.log("Pasé restricción")
      next();
    }
  }
  
  module.exports = new RoleMiddleware();
  
  