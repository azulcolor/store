module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
  });

  Business.associate = (models) => {
    Business.hasMany(models.User, { foreignKey: 'businessId' });
    Business.hasMany(models.Product, { foreignKey: 'businessId' }); 
  };

  return Business;
};
