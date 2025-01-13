const db = require('../models/index.js');

class OrderService {
  constructor() {
    this.Order = db.Order;
    this.OrderProduct = db.OrderProduct;
    this.Product = db.Product;
  }

  async getAllOrders(userId, filters) {
    const where = { userId };

    // Filtrar por ID
    if (filters.id) {
      where.id = filters.id;
    }
  
    // Filtrar por Estado
    if (filters.statusId) {
      where.statusId = filters.statusId;
    }
  
    // Filtrar por Rango de Precios
    if (filters.minTotal || filters.maxTotal) {
      where.total = {
        ...(filters.minTotal && { [db.Sequelize.Op.gte]: filters.minTotal }),
        ...(filters.maxTotal && { [db.Sequelize.Op.lte]: filters.maxTotal }),
      };
    }
  
    return await this.Order.findAll({
      where,
      include: [
        {
          model: this.OrderProduct,
          as: 'OrderProducts',
          include: [{ model: this.Product, as: 'Product', attributes: ['name', 'price'] }],
        },
      ],
    });
  }

  async getOrderById(id, userId) {
    const order = await this.Order.findOne({
      where: { id, userId },
      include: [
        {
          model: this.OrderProduct,
          as: 'OrderProducts', // Alias definido en el modelo `Order`
          include: [
            {
              model: this.Product,
              as: 'Product', // Alias definido en el modelo `OrderProduct`
              attributes: ['name', 'price'],
            },
          ],
        },
      ],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async createOrder(userId, data) {
    const { products, businessId, statusId } = data;

    // Calcular subtotal, IVA y total
    let subtotal = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await this.Product.findByPk(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      const totalProductPrice = product.price * item.quantity;
      subtotal += totalProductPrice;

      orderProducts.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const IVA = subtotal * 0.1; // 10% de IVA
    const total = subtotal + IVA;

    // Crear la orden
    const order = await this.Order.create({
      userId,
      businessId,
      statusId,
      subtotal,
      iva: IVA, // Asegurarse de que el campo coincida con el modelo
      total,
    });

    // Crear los productos asociados
    for (const item of orderProducts) {
      await this.OrderProduct.create({
        orderId: order.id,
        ...item,
      });
    }

    return this.getOrderById(order.id, userId);
  }

  async updateOrder(id, userId, data) {
    const order = await this.getOrderById(id, userId);

    if (data.statusId) {
      order.statusId = data.statusId;
    }

    await order.save();

    return order;
  }

  async deleteOrder(id, userId) {
    const order = await this.getOrderById(id, userId);
    await order.destroy();
  }

  async cancelOrder(userId, orderId) {
    // Verificar que la orden existe y pertenece al usuario
    const order = await this.Order.findOne({
      where: { id: orderId, userId, statusId: { [Op.ne]: 1 } }, // Excluir órdenes "Por pagar"
      include: [
        {
          model: this.OrderProduct,
          as: 'OrderProducts', // Alias definido en el modelo
          include: [
            {
              model: this.Product,
              as: 'Product', // Alias definido en el modelo
            },
          ],
        },
      ],
    });
  
    if (!order) {
      throw new Error('Order not found or cannot be canceled');
    }
  
    // Restaurar el stock de los productos
    for (const orderProduct of order.OrderProducts) {
      const product = orderProduct.Product;
  
      // Aumentar el stock del producto
      product.stock += orderProduct.quantity;
      await product.save();
    }
  
    // Cambiar el estado de la orden a "Cancelado"
    order.statusId = 4; // 4 = Cancelado
    await order.save();
  
    return { message: 'Order canceled successfully', orderId: order.id };
  }
  

  
}

module.exports = new OrderService();
