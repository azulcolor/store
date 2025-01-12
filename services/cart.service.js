const db = require('../models/index.js');

class CartService {
  constructor() {
    this.Order = db.Order;
    this.OrderProduct = db.OrderProduct;
    this.Product = db.Product;
  }

  async getCart(userId) {
    const cart = await this.Order.findOne({
      where: { userId, statusId: 1 }, // Estado "Por pagar"
      include: [
        {
          model: this.OrderProduct,
          as: 'OrderProducts', // Alias debe coincidir con la asociación en el modelo `Order`
          include: [
            {
              model: this.Product,
              as: 'Product', // Alias debe coincidir con la asociación en el modelo `OrderProduct`
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
      where: { userId, statusId: 1 }, // Estado "Por pagar"
      include: [
        {
          model: this.OrderProduct,
          as: 'OrderProducts', // Alias definido en el modelo `Order`
          include: [
            {
              model: this.Product,
              as: 'Product', // Alias definido en el modelo `OrderProduct`
              attributes: ['id', 'name', 'price'],
            },
          ],
        },
      ],
    });
  
    if (!carts || carts.length === 0) {
      throw new Error('No active carts found');
    }
  
    return carts; // Devuelve todos los carritos activos
  }
  
  

  async addProductToCart(userId, productId, quantity) {
    // Validar si el producto existe
    const product = await this.Product.findByPk(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
  
    // Verificar si ya hay un carrito activo para este negocio
    let cart = await this.Order.findOne({
      where: { userId, businessId: product.businessId, statusId: 1 }, // 1 = "Por pagar"
    });
  
    // Si no existe un carrito para este negocio, crearlo
    if (!cart) {
      cart = await this.Order.create({
        userId,
        businessId: product.businessId,
        statusId: 1, // Estado "Por pagar"
        subtotal: 0,
        iva: 0,
        total: 0,
      });
    }
  
    // Verificar si el producto ya está en el carrito
    const existingProduct = await this.OrderProduct.findOne({
      where: { orderId: cart.id, productId },
    });
  
    if (existingProduct) {
      // Actualizar la cantidad
      existingProduct.quantity += quantity;
      await existingProduct.save();
    } else {
      // Agregar nuevo producto
      await this.OrderProduct.create({
        orderId: cart.id,
        productId,
        quantity,
        price: product.price,
      });
    }
  
    // Recalcular totales del carrito
    await this.recalculateCart(cart.id);
  
    return this.getCart(userId); // Retorna el carrito actualizado
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
      // Eliminar el producto si la cantidad es 0
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
      where: { id: orderId, userId, statusId: 1 }, // Solo órdenes "Por pagar"
      include: [
        {
          model: this.OrderProduct,
          as: 'OrderProducts', // Alias debe coincidir
          include: [{ model: this.Product, as: 'Product' }],
        },
      ],
    });
    console.log("Llego hasta aquí")
  
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

    const IVA = subtotal * 0.1; // 10% IVA
    const total = subtotal + IVA;

    await this.Order.update({ subtotal, IVA, total }, { where: { id: orderId } });
  }
}

module.exports = new CartService();
