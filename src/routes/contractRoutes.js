const express = require('express');
const router = express.Router();

const contractController = require('../controllers/contractController');
const { getProfile } = require('../middleware/getProfile');

router.get('/', getProfile, contractController.getContracts);
router.get('/:id', getProfile, contractController.getContractById);

module.exports = router; 