const Sequelize = require('sequelize');
const sequelize = require('./db');

class Profile extends Sequelize.Model {
  static initModel(sequelize) {
    return super.init(
      {
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        profession: {
          type: Sequelize.STRING,
          allowNull: false
        },
        balance: {
          type: Sequelize.DECIMAL(12, 2)
        },
        type: {
          type: Sequelize.ENUM('client', 'contractor')
        }
      },
      {
        sequelize,
        modelName: 'Profile'
      }
    );
  }

  static associate(models) {
    Profile.hasMany(models.Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
    Profile.hasMany(models.Contract, { as: 'Client', foreignKey: 'ClientId' });
  }
}

module.exports = Profile.initModel(sequelize);