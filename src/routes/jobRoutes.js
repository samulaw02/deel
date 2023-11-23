const express = require('express');
const router = express.Router();

const jobController = require('../controllers/jobController');
const { getProfile } = require('../middleware/getProfile');

router.get('/unpaid', getProfile, jobController.unpaidJobs);
router.post('/:job_id/pay', getProfile, jobController.payForJob);

module.exports = router; 