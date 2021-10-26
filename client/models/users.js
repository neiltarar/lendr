const db = require('../database/db');

const users = {
   getUser(email, password) {
       const sql = "SELECT * FROM users WHERE email = $1 AND password = $2";
       return db
            .query(sql, [email, password])
            .then((dbRes) => dbRes.rows);
    }
};

module.exports = users;