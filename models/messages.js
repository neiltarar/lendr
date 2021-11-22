const db = require("../database/db");

const Messages = {
  insertMessage(date, content, auther_id, conversation_id) {
    const sql = `INSERT INTO messages (date, content, author_id, conversation_id) values ($1, $2, $3, $4);`;
    const values = [date, content, auther_id, conversation_id];
    return db.query(sql, values);
  },
  getAllMessages(sessionuser_id) {
    const sql = `SELECT (conversations.subject, date, content, author_id) FROM messages
    INNER JOIN conversations ON (messages.conversation_id = conversations.conversation_id)
    WHERE conversations.sessionuser_id = $1;
    `;
    const value = [sessionuser_id];
    return db.query(sql, value).then((dbRes) => dbRes.rows);
  },
};

module.exports = Messages;
