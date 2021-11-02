const db = require('../database/db');

const Messages = {
    getAll(){
        const sql = "SELECT * FROM messages";
        return db.query(sql).then((dbRes) => dbRes.rows);
    },
    getMessagesByProductId(productid){
        sql = `SELECT messages.message_id,messages.date, messages.content, messages.author_id, users.user_id, users.username as author
        FROM messages 
        JOIN conversations 
        ON messages.author_id = conversations.sessionuser_id OR messages.author_id = conversations.productowner_id
        JOIN users
        ON users.user_id = messages.author_id
        WHERE conversations.productid = $1`
        
        return db   
               .query(sql, [productid])
               .then((dbRes) => dbRes.rows);
    },
    createMessage(){
        
    }
}

module.exports = Messages;