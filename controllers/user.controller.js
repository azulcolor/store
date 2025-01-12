const userService = require('../services/user.service.js');
const handleError = require('../utils/handle-error.js');

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ ok: true, users });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async getById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({ ok: true, user });
    } catch (error) {
      handleError.showErrorMessage(res, { message: 'User not found', status: 404 });
    }
  }

  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ ok: true, user });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async update(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json({ ok: true, user });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async delete(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      handleError.showErrorMessage(res, { message: 'User not found', status: 404 });
    }
  }

  async activateUser(req, res) {
    try {
      await userService.activateUser(req.params.id);
      res.status(200).json({ok: true, message: "El usuario fue activado"})
    } catch(error) {
      handleError.showErrorMessage(res, error)
    }
  }

}

module.exports = new UserController();


