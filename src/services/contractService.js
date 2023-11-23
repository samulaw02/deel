const { Contract, Profile } = require('../models/index.js');
const Sequelize = require('sequelize');


async function getContractsForProfile(profileId) {
  try {
    // Find contracts associated with the given profile ID that are not terminated
    const contracts = await Contract.findAll({
      where: {
        [Sequelize.Op.or]: [
          { ClientId: profileId },
          { ContractorId: profileId },
        ],
        status: { [Sequelize.Op.ne]: 'terminated' },
      },
    });
    return contracts;
  } catch (error) {
    throw new Error('Error fetching contracts for the profile');
  }
}

async function getContractById(contractId, profileId) {
  try {
    // Find a specific contract by ID associated with the given profile ID
    const contract = await Contract.findOne({
      where: {
        id: contractId,
        [Sequelize.Op.or]: [
          { ClientId: profileId },
          { ContractorId: profileId }
        ]
      }
    });
    return contract;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getContractsForProfile,
  getContractById,
};