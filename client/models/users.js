const db = require('../database/db');

const usersDB = {
   getUser(email) {
       const sql = "SELECT * FROM users WHERE email = $1";
       return db
            .query(sql, [email])
            .then((dbRes) => dbRes.rows);
    },
    create(username, email, password_hash) {
        const sql = "INSERT INTO users(username, email, password) VALUES($1, $2, $3)";
        const values = [username, email, password_hash];
        return db.query(sql, values).then((dbRes) => dbRes.rows[0]);
    }
};

module.exports = usersDB;