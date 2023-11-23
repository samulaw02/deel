const jobService = require('../services/jobService');


async function unpaidJobs(req, res) {
    try {
      const jobs = await jobService.getUnpaidJobs(req.profile);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function payForJob(req, res) {
    try {  
        const { job_id } = req.params;
        const client = req.profile;
        // Check if the user is a client
        if (client.type !== 'client') {
          return res.status(403).json({ error: 'Only clients can make payments.' });
        }  
        const paymentResult = await jobService.payForJob(job_id, client);
        if (paymentResult.success === true) {
            return res.status(200).json(paymentResult);
        }
        return res.status(400).json(paymentResult);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
}


module.exports = {
    unpaidJobs,
    payForJob
};