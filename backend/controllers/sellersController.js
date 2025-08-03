const sellerService = require('../services/sellerService');

module.exports = {
  getSellers: async (req, res) => {
    try {
      const sellers = await sellerService.getAllSellers();
      res.json(sellers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};