const { Op } = require('sequelize');
const { getContractById, getContractsForProfile } = require('../src/services/contractService');
const { Profile, Contract} = require('../src/models/index');

describe('Contract Service', () => {
  let firstProfile;
  let contractOfFirstProfile;

  beforeAll(async () => {
    // Fetch a random profile from the test database
    firstProfile = await Profile.findOne();

    // Fetch a contract associated with the random profile
    contractOfFirstProfile = await Contract.findOne({
      where: {
        [Op.or]: [{ ClientId: firstProfile.id }, { ContractorId: firstProfile.id }],
      },
    });
  });

  it('should return the contract if it belongs to the calling profile', async () => {
    const resultContract = await getContractById(contractOfFirstProfile.id, firstProfile.id);
    // Assert that the ClientId or ContractorId matches the test profile ID
    expect(resultContract.ClientId === firstProfile.id || resultContract.ContractorId === firstProfile.id).toBe(true);
  });

  it('should return all contracts if it belongs to the calling profile', async () => {
    const resultContracts = await getContractsForProfile(firstProfile.id);
    // Assert that at least one contract is associated with the test profile
    expect(resultContracts.some(contract => contract.ClientId === firstProfile.id || contract.ContractorId === firstProfile.id)).toBe(true);
  });
});