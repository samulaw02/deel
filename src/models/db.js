const Sequelize = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

module.exports = sequelize;