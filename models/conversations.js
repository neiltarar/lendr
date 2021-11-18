const db = require("../database/db");

const Conversations = {
  getAll() {
    const sql = "SELECT * FROM conversations";
    return db.query(sql).then((dbRes) => dbRes.rows);
  },
  getByProductId(id) {
    const sql = "SELECT * FROM conversations WHERE productid= $1";
    return db.query(sql, [id]).then((dbRes) => dbRes.rows[0]);
  },
  //Join conversation, products and users table for messages functionality
  getConvoData(id, sessionUserId) {
    const sql = `SELECT *
        FROM conversations
        WHERE conversations.productid = $1 AND conversations.sessionuser_id = $2 `;

    return db.query(sql, [id, sessionUserId]).then((dbRes) => dbRes.rows);
  },
  insertConversation(subject, productowner_id, sessionuser_id) {
    const sql =
      "INSERT INTO conversations(subject, date, producrowner_id, sessionuser_id) VALUES($1, $2, $3)";
    const values = [subject, productowner_id, sessionuser_id];
  },
};

module.exports = Conversations;
