const db = require('../database/db');

const Messages = {
    getAll(){
        const sql = "SELECT * FROM messages";
        return db.query(sql).then((dbRes) => dbRes.rows);
    },
    getMessagesByConvoId(id){
        sql = `SELECT messages.message_id, messages.date, messages.content, messages.author_id, messages.conversation_id, users.user_id, users.username
        FROM messages
        JOIN users 
            ON messages.author_id = users.user_id
        WHERE messages.conversation_id = $1;`
        
        return db   
               .query(sql, [id])
               .then((dbRes) => dbRes.rows);
    },
    createMessage(){
        
    }
}

module.exports = Messages;