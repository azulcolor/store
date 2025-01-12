const userService = require('../services/user.service.js');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { user, token } = await userService.login(email, password);

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.roleId,
        },
        token,
      });
    } catch (error) {
      if (
        error.message === 'User not found' ||
        error.message === 'Invalid credentials'
      ) {
        return res.status(401).json({ error: 'Usuario o contraseña inválidos' });
      }
      return res.status(500).json(error);
    }
  }
}

module.exports = new AuthController();
