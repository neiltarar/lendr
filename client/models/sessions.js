const db = require('../database/db');

const Sessions = {
    getAll(){
        const sql = "SELECT * FROM session";
        return db.query(sql).then((dbRes) => dbRes.rows);
    },
    
}

module.exports = Sessions;