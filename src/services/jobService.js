const { Job, Contract, Profile, Transaction } = require('../models/index.js');
const Sequelize = require('sequelize');
const sequelize = require('../models/db.js');


async function getUnpaidJobs(profile) {
    try {
      const unpaidJobs = await Job.findAll({
        include: [
          {
            model: Contract,
            where: {
              status: 'in_progress',
              [Sequelize.Op.or]: [
                { ClientId: profile.id },
                { ContractorId: profile.id }
              ]
            }
          }
        ],
        where: {
          paid: false
        }
      });
      return unpaidJobs;
    } catch (error) {
      throw new Error('Error fetching unpaid jobs for the user');
    }
}


async function payForJob(job_id, client) {
    try {
      const job = await Job.findOne({
        where: { id: job_id, paid: false },
        include: [{ model: Contract, where: { status: 'in_progress' } }],
      });
      /** If job or its associated contract doesn't exist
       *  Or the contract isn't in progress
       *  Or the client isn't assigned to the contract
       */ 
      if (!job || !job.Contract || job.Contract.status !== 'in_progress' || job.Contract.ClientId !== client.id) {
        return res.status(400).json({ error: 'Job, contract, or assignment status invalid.' });
      }
      const { price, Contract: { ContractorId } } = job;
      if (client.balance < price) {
        throw new Error('Insufficient balance.');
      }
      const contractor = await Profile.findByPk(ContractorId);
      await sequelize.transaction(async (t) => {
        await Promise.all([
          Profile.update(
            { balance: Sequelize.literal(`balance - ${price}`)},
            { where: { id: client.id }, transaction: t }
          ),
          Profile.update(
            { balance: Sequelize.literal(`balance + ${price}`) },
            { where: { id: contractor.id }, transaction: t }
          ),
          job.update({ paid: true }, { transaction: t }),
          Transaction.create(
            {
              clientId: client.id,
              contractorId: contractor.id,
              amount: price,
              jobId: job.id
            },
            { transaction: t }
          ),
        ]);
      });
      return { success: true, message: 'Payment successful.' };
    } catch (error) {
      return { success: false, message: error };
    }
}


module.exports = {
    getUnpaidJobs,
    payForJob
};