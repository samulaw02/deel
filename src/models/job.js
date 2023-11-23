const Sequelize = require('sequelize');
const sequelize = require('./db');

class Job extends Sequelize.Model {
  static initModel(sequelize) {
    return super.init(
      {
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: false
        },
        paid: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        paymentDate: {
          type: Sequelize.DATE
        }
      },
      {
        sequelize,
        modelName: 'Job'
      }
    );
  }

  static associate(models) {
    Job.belongsTo(models.Contract);
  }
}

module.exports = Job.initModel(sequelize);