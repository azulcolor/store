const db = require('../models/index.js');

class CartService {
  constructor() {
    this.Order = db.Order;
    this.OrderProduct = db.OrderProduct;
    this.Product = db.Product;
  }

  async getCart(userId) {
    const cart = await this.Order.findOne({
      where: { userId, statusId: 1 }, 
      include: [
        {
          model: this.OrderProduct,
          as: 'OrderProducts', 
          include: [
            {
              model: this.Product,
              as: 'Product', 
              attributes: ['id', 'name', 'price'],
            },
          ],
        },
      ],
    });
  
    if (!cart) {
      throw new Error('No active cart found');
    }
  
    return cart;
  }

  async getCarts(userId) {
    const carts = await this.Order.findAll({
      where: { userId, statusId: 1 }, 
      include: [
        {
          model: this.OrderProduct,
          as: 'OrderProducts', 
          include: [
            {
              model: this.Product,
              as: 'Product', 
              attributes: ['id', 'name', 'price'],
            },
          ],
        },
      ],
    });
  
    if (!carts || carts.length === 0) {
      throw new Error('No active carts found');
    }
  
    return carts; 
  }
  
  

  async addProductToCart(userId, productId, quantity) {
    const product = await this.Product.findByPk(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
  
    let cart = await this.Order.findOne({
      where: { userId, businessId: product.businessId, statusId: 1 }, 
    });
  
    let isNewCart = false;
    if (!cart) {
      cart = await this.Order.create({
        userId,
        businessId: product.businessId,
        statusId: 1, 
        subtotal: 0,
        iva: 0,
        total: 0,
      });
      isNewCart = true; 
    }
  
    const existingProduct = await this.OrderProduct.findOne({
      where: { orderId: cart.id, productId },
    });
  
    const currentQuantity = existingProduct ? existingProduct.quantity : 0;
    const totalQuantity = currentQuantity + quantity;
  
    if (totalQuantity > product.stock) {
      if (isNewCart) {
        await cart.destroy();
      }
      throw new Error(`Se excedió el stock`);
    }
  
    if (existingProduct) {
      existingProduct.quantity = totalQuantity;
      await existingProduct.save();
    } else {
      await this.OrderProduct.create({
        orderId: cart.id,
        productId,
        quantity,
        price: product.price,
      });
    }
  
    await this.recalculateCart(cart.id);
  
    return this.getCart(userId); 
  }  
  
  async updateProductQuantity(userId, productId, quantity) {
    const cart = await this.getCart(userId);

    const productInCart = await this.OrderProduct.findOne({
      where: { orderId: cart.id, productId },
    });

    if (!productInCart) {
      throw new Error(`Product with ID ${productId} not found in cart`);
    }

    if (quantity <= 0) {
      await productInCart.destroy();
    } else {
      productInCart.quantity = quantity;
      await productInCart.save();
    }

    await this.recalculateCart(cart.id);
    return this.getCart(userId);
  }

  async removeProductFromCart(userId, productId) {
    const cart = await this.getCart(userId);

    const productInCart = await this.OrderProduct.findOne({
      where: { orderId: cart.id, productId },
    });

    if (!productInCart) {
      throw new Error(`Product with ID ${productId} not found in cart`);
    }

    await productInCart.destroy();
    await this.recalculateCart(cart.id);
    return this.getCart(userId);
  }

  async checkout(orderId, userId) {

    const order = await this.Order.findOne({
      where: { id: orderId, userId, statusId: 1 }, 
      include: [
        {
          model: this.OrderProduct,
          as: 'OrderProducts', 
          include: [{ model: this.Product, as: 'Product' }],
        },
      ],
    });
  
    if (!order) {
      throw new Error('Order not found or not eligible for checkout');
    }
  
    for (const orderProduct of order.OrderProducts) {
      if (orderProduct.Product.stock < orderProduct.quantity) {
        throw new Error(
          `Insufficient stock for product "${orderProduct.Product.name}". Available: ${orderProduct.Product.stock}`
        );
      }
    }
  
    for (const orderProduct of order.OrderProducts) {
      const product = orderProduct.Product;
      product.stock -= orderProduct.quantity;
      await product.save();
    }
  
    order.statusId = 2;
    await order.save();
  
    return { ok: true, message: 'Order has been successfully paid' };
  }
  

  async recalculateCart(orderId) {
    const cartProducts = await this.OrderProduct.findAll({ where: { orderId } });

    let subtotal = 0;
    for (const item of cartProducts) {
      subtotal += item.price * item.quantity;
    }

    const IVA = subtotal * 0.1; 
    const total = subtotal + IVA;

    await this.Order.update({ subtotal, IVA, total }, { where: { id: orderId } });
  }
}

module.exports = new CartService();
