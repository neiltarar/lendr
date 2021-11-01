const db = require('../database/db');

const Conversations = {
    getAll(){
        const sql = "SELECT * FROM conversations";
        return db.query(sql).then((dbRes) => dbRes.rows);
    },
    getByProductId(id){
        const sql = "SELECT * FROM conversations WHERE productid= $1";
        return db   
               .query(sql, [id])
               .then((dbRes) => dbRes.rows[0]);    
        
    },
    //Join conversation, products and users table for messages functionality
    getConvoData(id, sessionUser_id){
        const sql = `SELECT conversations.conversation_id, conversations.subject, conversations.productid, products.id as productId, products.name as productName, users.user_id as productOwner_id, users.username as productOwner
        FROM conversations
        JOIN products 
            ON conversations.productID=products.id 
        JOIN users
            ON conversations.productOwner_id= users.user_id
        WHERE products.id = $1 AND sessionUser_id = $2 `;
        
        return db   
               .query(sql, [id, sessionUserId ])
               .then((dbRes) => dbRes.rows); 
        
    },
    insertConversation(subject, date, productowner_id, sessionuser_id ){
        const sql = "INSERT INTO conversations(subject, date, producrowner_id, sessionuser_id) VALUES($1, $2, $3, $4)";
        const values = [subject, date, productowner_id, sessionuser_id];
    }
}

module.exports = Conversations;