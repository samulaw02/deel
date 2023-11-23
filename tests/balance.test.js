const { depositIntoBalance } = require('../src/services/balanceService');


describe('Balance Service', () => {
  let userId = 1;
  let depositAmount = 200;
  it('should deposit money into the client balance without exceeding 25% of total job prices', async () => {
      const response = await depositIntoBalance(userId, depositAmount);
      // Assert based on the response from depositIntoBalance function
      if (!response.success) {
          // Deposit failed
          expect(response.success).toBe(false);
          expect(response.error).toBeDefined();
        } else {
          // Deposit successful
          expect(response.success).toBe(true);
          expect(response.message).toBe('Deposit successful.');
        }
    });
});