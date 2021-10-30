const db = require("../database/db");

const ProductsList = {
  getAll() {
    const sql = "SELECT * FROM products";
    return db.query(sql).then((dbRes) => dbRes.rows);
  },
  getById(id) {
    const sql = "SELECT * FROM products WHERE id = $1"; //number needs to match where the it is in the order of the array
    const values = [id];
    return db.query(sql, values).then((dbRes) => dbRes.rows[0]);
  }
};
module.exports = ProductsList; //exporting functions in one go as an object
