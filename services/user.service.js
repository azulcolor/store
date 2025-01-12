const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenHelper = require('../utils/token.helper.js');
const db = require('../models/index.js');

class UserService {
  constructor() {
    this.User = db.User;
    this.Business = db.Business;
  }

  async getAllUsers() {
    return await this.User.findAll({
      include: { model: this.Business, as: 'Business', attributes: ['id', 'name'] },
    });
  }

  async getUserById(id) {
    const user = await this.User.findByPk(id, {
      include: { model: this.Business, as: 'Business', attributes: ['id', 'name'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(data) {
    if (data.roleId === 1 && !data.businessId) { // Validar que los negocios tengan un businessId
      throw new Error('Business ID is required for business users');
    }
    return await this.User.create(data);
  }

  async updateUser(id, data) {
    const user = await this.getUserById(id);

    if (data.roleId === 1 && !data.businessId) { // Validar que los negocios tengan un businessId
      throw new Error('Business ID is required for business users');
    }

    return await user.update(data);
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    return await user.destroy();
  }

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async login(email, password) {
    const user = await this.User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isVerified) {
      throw new Error('Account not verified. Please activate your account.');
    }

    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = tokenHelper.generateToken({
      id: user.id,
      email: user.email,
      role: user.roleId,
      businessId: user.businessId || null
    });

    return { user, token };
  }

  async activateUser(userId) {
    const user = await this.User.findByPk(userId);
  
    if (!user) {
      throw new Error('Invalid activation token');
    }
  
    if (user.isVerified) {
      throw new Error('Account is already verified');
    }
  
    user.isVerified = true;
    await user.save();
  
    return { message: 'Account activated successfully' };
  }
}

module.exports = new UserService();
