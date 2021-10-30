const db = require('../database/db');

const Conversations = {
    getAll(){
        const sql = "SELECT * FROM conversations";
        return db.query(sql).then((dbRes) => dbRes.rows);
    },
    getByUserId(producrowner_id,sessionuser_id){
        const sql = "SELECT * FROM conversations WHERE productowner_id = $1 AND sessionuser_id=$2";
        return db   
               .query(sql, [producrowner_id])
               .then((dbRes) => dbRes.rows[0]);    
        
    },
    create(subject, date, productowner_id, sessionuser_id ){
        const sql = "INSERT INTO conversations(subject, date, producrowner_id, sessionuser_id) VALUES($1, $2, $3, $4)";
        const values = [subject, date, productowner_id, sessionuser_id];
        return db.query(sql,values)
               .then((dbRes)=> {
                   console.log(dbRes);
                   dbRes;
               });
    }
}

module.exports = Conversations;