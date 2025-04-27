const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Property = sequelize.define('Property', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM(
        'house',
        'apartment',
        'warehouse',
        'commercial'
      ),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  return Property;
};