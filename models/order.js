module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      iva: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.Business, { foreignKey: 'businessId', as: 'Business' });
      Order.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      Order.belongsTo(models.OrderStatus, { foreignKey: 'statusId', as: 'OrderStatus' });
      Order.hasMany(models.OrderProduct, { foreignKey: 'orderId', as: 'OrderProducts' });
    };
    
  
    return Order;
  };
  
  
  