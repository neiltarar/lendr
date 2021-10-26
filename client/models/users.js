const db = require('../database/db');

const users = {
   getUser(email, password) {
       const sql = "SELECT * FROM users WHERE email = $1 AND password = $2";
       return db
            .query(sql, [email, password])
            .then((dbRes) => dbRes.rows);
    },
    create(username, email, password_hash) {
        const sql = "INSERT INTO users(username, email, password) VALUES($1, $2, $3)";
        const values = [username, email, password_hash];
        return db.query(sql, values).then((dbRes) => dbRes.rows[0]);
    }
};

module.exports = users;