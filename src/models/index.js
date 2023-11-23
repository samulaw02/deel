const associateModels = require('./associations');

const Profile = require('./profile');
const Contract = require('./contract');
const Job = require('./job');
const Transaction = require('./transaction');

associateModels();

module.exports = {
  Profile,
  Contract,
  Job,
  Transaction
};