const { getBestProfession, getBestClients } = require('../src/services/adminService');


describe('Admin Service', () => {
  it('should return the profession that earned the most money for any contractor within the given time range', async () => {
  const startDate = '2020-08-10';
  const endDate = '2020-08-18'; 
  const result = await getBestProfession(startDate, endDate);
    // Validate the response from the service
    expect(result.success).toBe(true);
    expect(result.data[0].dataValues.profession).toBe('Programmer');
  });

  it('should return the clients that paid the most for jobs within the given time range with a specified limit', async () => {
  const startDate = '2020-08-10';
  const endDate = '2020-08-18'; 
  const limit = 3;
  const result = await getBestClients(startDate, endDate, limit);
    // Validate the response from the service
    expect(result.success).toBe(true);
    expect(result.data[0].totalPaid).toBe(2020);
  });
});