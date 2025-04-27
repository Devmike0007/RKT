const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
  }
);

// Import models
const User = require('./user')(sequelize);
const Product = require('./product')(sequelize);
const Service = require('./service')(sequelize);
const Property = require('./property')(sequelize);
const Contact = require('./contact')(sequelize);

// Associations if needed
// Example: User.hasMany(Product);

module.exports = {
  sequelize,
  User,
  Product,
  Service,
  Property,
  Contact
};