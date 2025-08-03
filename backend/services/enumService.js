const db = require('../config/db');
const queries = require('../queries/enumQueries');

module.exports = {
  getStyleTypes: async () => {
    const { rows } = await db.query(queries.GET_STYLE_TYPES);
    return rows.map(row => row.style);
  },
  
  getServiceTypes: async () => {
    const { rows } = await db.query(queries.GET_SERVICE_TYPES);
    return rows.map(row => row.service);
  }
};