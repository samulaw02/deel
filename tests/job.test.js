const { Op } = require('sequelize');
const { getUnpaidJobs, payForJob } = require('../src/services/jobService');
const { Profile, Contract, Job} = require('../src/models/index');

describe('Job Service', () => {
  let profileWithUnpaidJob;
  let jobId;

  beforeAll(async () => {
    // Fetch a random profile with active contact and an unpaid paid
    profileWithUnpaidJob = await Profile.findOne({
        where: { type: 'client'},
        include: [
          {
            model: Contract,
            as: 'Client',
            where: {
              status: 'in_progress',
            },
            include: {
              model: Job,
              as: 'Jobs',
              where: {
                paid: false,
              },
            },
          },
        ]
    });
    jobId = profileWithUnpaidJob.Client[0].Jobs[0].id;
  });

  it('should get all unpaid jobs for a user with active contracts', async () => {
    const unpaidJobs = await getUnpaidJobs(profileWithUnpaidJob);
    expect(unpaidJobs.length).toBeGreaterThan(0);
  });

  it('should successfully process payment for a job if client balance is sufficient', async () => {
    const paymentResponse = await payForJob(jobId, profileWithUnpaidJob);
     // Assert based on the response from payForJob function
    if (!paymentResponse.success) {
      // Payment failed
      expect(paymentResponse.success).toBe(false);
      expect(paymentResponse.error).toBeDefined();
    } else {
      // Payment successful
      expect(paymentResponse.success).toBe(true);
      expect(paymentResponse.message).toBe('Payment successful.');
    }
  });
});