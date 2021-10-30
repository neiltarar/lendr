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
  },
  addNewProduct(name, description, address, availability, category, user_id) {
    const sql = "INSERT INTO products(name, description, address, availability, category, user_id) VALUES($1, $2, $3, $4, $5, $6)";
    const values = [name, description, address, availability, category, user_id];
    return db.query(sql, values).then((dbRes) => dbRes.rows[0]);
  },
  deleteProduct(id) {
    const sql = "DELETE FROM products WHERE id = $1";
    const values = [id];
    return db.query(sql, values).then((dbRes) => dbRes.rows[0]);
  },
  updateProductParameters(name, description, address, availability, product_id) {
    const sql = "UPDATE products SET name = $1, description = $2, address = $3, availability = $4 WHERE id = $6";
    const values = [name, description, address, availability, product_id];
    return db.query(sql, values).then((dbRes) => dbRes.rows[0]);
  }
};
module.exports = ProductsList; //exporting functions in one go as an object