const tokenHelper = require('../utils/token.helper.js');
const handleError = require('../utils/handle-error.js');

class AuthMiddleware {
  verifyToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      return res.status(403).json({ ok: false, error: 'No token provided' });
    }

    try {
      const token = authorizationHeader.split(' ')[1];
      const decoded = tokenHelper.verifyToken(token);

      req.user = {
        id: decoded.id,
        email: decoded.email,
        roleId: decoded.role,
        businessId: decoded.businessId || null,
      };

      next();
    } catch (err) {
      handleError.showErrorMessage(res, { message: 'Invalid or expired token', status: 401 });
    }
  }
}

module.exports = new AuthMiddleware();



