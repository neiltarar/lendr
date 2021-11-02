const db = require('../database/db');

const Sessions = {
    getSession(){
        const sql = "SELECT sess FROM session";
        return db.query(sql).then((dbRes) => dbRes.rows[0]);
    },
    
}

module.exports = Sessions;