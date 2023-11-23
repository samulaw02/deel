const Sequelize = require('sequelize');
const sequelize = require('./db');

class Transaction extends Sequelize.Model {
  static initModel(sequelize) {
    return super.init(
      {
        amount: {
          type: Sequelize.DECIMAL(12, 2)
        }
      },
      {
        sequelize,
        modelName: 'Transaction'
      }
    );
  }

  static associate(models) {
    Transaction.belongsTo(models.Profile, { as: 'client', foreignKey: 'clientId' });
    Transaction.belongsTo(models.Profile, { as: 'contractor', foreignKey: 'contractorId' });
    Transaction.belongsTo(models.Job, { foreignKey: 'jobId' });
  }
}

module.exports = Transaction.initModel(sequelize);