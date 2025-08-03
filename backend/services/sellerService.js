const db = require('../config/db');
const queries = require('../queries/sellerQueries');

module.exports = {
  getAllSellers: async () => {
    const { rows } = await db.query(queries.GET_ALL_SELLERS);
    return rows;
  }
};