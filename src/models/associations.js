const Profile = require('./profile');
const Contract = require('./contract');
const Job = require('./job');
const Transaction = require('./transaction');

function associateModels() {
  const models = {
    Profile,
    Contract,
    Job,
    Transaction
  };

  Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));
}

module.exports = associateModels;