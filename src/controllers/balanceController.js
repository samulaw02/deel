const balanceService = require('../services/balanceService');


async function depositIntoBalance(req, res) {
    try {
      const { userId } = req.params;
      const { amount } = req.body;
      const balanceResult = await balanceService.depositIntoBalance(userId, amount);
      if (paymentResult.success === true) {
        return res.status(200).json(balanceResult);
      }
      return res.status(422).json(balanceResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
module.exports = {
  depositIntoBalance
};