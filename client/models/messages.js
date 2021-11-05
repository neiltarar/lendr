const db = require('../database/db');

const Messages = {
    getAll(){
        const sql = "SELECT * FROM messages";
        return db.query(sql).then((dbRes) => dbRes.rows);
    },
    getMessagesByProductId(conversationId){
        sql = `SELECT * FROM messages 
        JOIN users
            ON users.user_id = messages.author_id
        WHERE conversation_id = $1`
        
        return db   
               .query(sql, [conversationId])
               .then((dbRes) => dbRes.rows);
    },
    postMessage(userId, conversationId){
        
    }
}

module.exports = Messages;