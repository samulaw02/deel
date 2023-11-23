const Sequelize = require('sequelize');
const sequelize = require('./db');

class Contract extends Sequelize.Model {
  static initModel(sequelize) {
    return super.init(
      {
        terms: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('new', 'in_progress', 'terminated')
        }
      },
      {
        sequelize,
        modelName: 'Contract'
      }
    );
  }

  static associate(models) {
    Contract.belongsTo(models.Profile, { as: 'Client' });
    Contract.belongsTo(models.Profile, { as: 'Contractor' });
    Contract.hasMany(models.Job);
  }
}

module.exports = Contract.initModel(sequelize);