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
      unique: true, // Nombres de negocios únicos
    },
  });

  Business.associate = (models) => {
    Business.hasMany(models.User, { foreignKey: 'businessId' }); // Asociación con usuarios
    Business.hasMany(models.Product, { foreignKey: 'businessId' }); // Asociación con productos
  };

  return Business;
};
