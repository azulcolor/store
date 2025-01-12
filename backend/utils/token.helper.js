const jwt = require('jsonwebtoken');

class TokenHelper {
  generateToken(payload, expiresIn = '24h') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT Verification Error:', err.message);
      throw new Error('Invalid or expired token');
    }
  }

  decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = new TokenHelper();
