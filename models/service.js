const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM(
        'vehicle_rental',
        'fuel_delivery',
        'delivery_service'
      ),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    pricePerHour: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    pricePerDay: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  });

  return Service;
};