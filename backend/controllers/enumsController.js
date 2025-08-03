const enumService = require('../services/enumService');

module.exports = {
  getStyleTypes: async (req, res) => {
    try {
      const styles = await enumService.getStyleTypes();
      res.json(styles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  getServiceTypes: async (req, res) => {
    try {
      const services = await enumService.getServiceTypes();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};