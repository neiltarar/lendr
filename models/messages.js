const db = require("../database/db");

const Messages = {
  insertMessage(date, content, auther_id, conversation_id) {
    const sql = `INSERT INTO messages (date, content, author_id, conversation_id) values ($1, $2, $3, $4);`;
    const values = [date, content, auther_id, conversation_id];
    return db.query(sql, values);
  },
};

module.exports = Messages;
