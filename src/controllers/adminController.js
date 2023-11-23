const adminService = require('../services/adminService');


async function getBestProfession(req, res) {
    try {
      const { start, end} = req.query;
      const result = await adminService.getBestProfession(start, end);
      if (result.success === true) {
        res.status(200).json(result);
      }
      res.status(400).json(result);
    } catch (error) {
        res.status(500).json({sucess: false, error: error.message});
    }
}

async function getBestClients(req, res) {
    try {
      const { start, end, limit = 2 } = req.query;
      const result = await adminService.getBestClients(start, end, limit);
      if (result.success === true) {
        res.status(200).json(result);
      }
      res.status(400).json(result);
    } catch (error) {
        res.status(500).json({sucess: false, error: error.message});
    }
}

module.exports = {
    getBestProfession,
    getBestClients
};