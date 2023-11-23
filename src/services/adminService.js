const { Profile, Contract, Job } = require('../models/index.js');
const sequelize = require('../models/db.js');
const { Op } = require('sequelize');

async function getBestProfession(start, end) {
    try {
        const bestProfession = await Job.findAll({
            attributes: [
              [sequelize.fn('sum', sequelize.col('price')), 'totalEarnings'],
              [sequelize.col('Contract.Contractor.profession'), 'profession']
            ],
            include: [
              {
                model: Contract,
                attributes: [],
                include: [
                  {
                    model: Profile,
                    as: 'Contractor',
                    attributes: ['profession'],
                    where: {
                        type: 'contractor'
                    },
                  }
                ]
              }
            ],
            where: {
              paid: true,
              paymentDate: {
                [Op.between]: [start, end]
              }
            },
            group: [sequelize.col('Contract.Contractor.profession')],
            order: [[sequelize.literal('totalEarnings'), 'DESC']],
            limit: 1
        });
        return { success: true, data: bestProfession };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


async function getBestClients(start, end, limit) {
    try {
      const jobsWithinPeriod = await Job.findAll({
        include: [
          {
            model: Contract,
            include: [
              {
                model: Profile,
                as: 'Client',
                attributes: ['id', 'firstName', 'lastName'],
                where: {
                  type: 'client',
                },
              },
            ],
          },
        ],
        attributes: [
          [sequelize.fn('sum', sequelize.col('price')), 'totalPaid'],
        ],
        where: {
          paid: true,
          paymentDate: {
            [Op.between]: [start, end],
          },
        },
        group: ['Contract.ClientId'],
        order: [[sequelize.literal('totalPaid'), 'DESC']],
        limit: parseInt(limit),
      });
  
      const bestClients = jobsWithinPeriod.map(job => ({
        id: job.Contract.Client.id,
        firstName: job.Contract.Client.firstName,
        lastName: job.Contract.Client.lastName,
        totalPaid: job.dataValues.totalPaid,
      }));
      return { success: true, data: bestClients };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = {
    getBestProfession,
    getBestClients
};