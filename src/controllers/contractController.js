const contractService = require('../services/contractService');


async function getContracts(req, res) {
    try {
      const contracts = await contractService.getContractsForProfile(req.profile.id);
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}


async function getContractById(req, res) {
  try {
    const contract = await contractService.getContractById(req.params.id, req.profile.id);
    if (!contract) {
      return res.status(404).end();
    }
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




module.exports = {
  getContractById,
  getContracts,
};