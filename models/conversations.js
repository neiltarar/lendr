const { PGStore } = require("connect-pg-simple");
const db = require("../database/db");

const Conversations = {
  getAll() {
    const sql = "SELECT * FROM conversations";
    return db.query(sql).then((dbRes) => dbRes.rows);
  },
  getByProductId(id) {
    const sql = "SELECT * FROM conversations WHERE productid = $1";
    const value = [id];
    return db.query(sql, value).then((dbRes) => dbRes.rows[0]);
  },
  //Join conversation, products and users table for messages functionality
  getConvoData(id, sessionUserId) {
    const sql = `SELECT *
        FROM conversations
        WHERE conversations.productid = $1 AND conversations.sessionuser_id = $2 `;
    const values = [id, sessionUserId];
    return db.query(sql, values).then((dbRes) => dbRes.rows);
  },
  getConversationId(productowner_id, sessionuser_id, productid) {
    const sql =
      "select conversation_id from conversations where productowner_id = $1 AND sessionuser_id = $2 AND productid = $3;";
    const values = [productowner_id, sessionuser_id, productid];
    return db.query(sql, values).then((dbRes) => dbRes.rows);
  },
  insertConversation(subject, productowner_id, sessionuser_id, productid) {
    console.log("insert conversation");
    const sql =
      "INSERT INTO conversations(subject, productowner_id, sessionuser_id, productid) VALUES($1, $2, $3, $4)";
    const values = [subject, productowner_id, sessionuser_id, productid];
    return db.query(sql, values);
  },
};

module.exports = Conversations;
