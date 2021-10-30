const db = require('../database/db');

const productsDB = {
    getProductAll(user_id) {
        const sql = "select * from users join products ON users.user_id = products.user_id;";
        return db
             .query(sql, [email])
             .then((dbRes) => dbRes.rows);
     },
    getProductID(user_id) {
        const sql = "SELECT (id) FROM products WHERE user_id = $1;";
        return db
            .query(sql , [user_id])
            .then((dbRes) => dbRes.rows);
    },
    insertReview(review, authorid, productid) {
        const sql = "INSERT INTO reviews (review , authorid , productid) VALUES ($1 , $2 , $3);";
        db.query(sql, [review, authorid, productid]);
    }
 };
 
 module.exports = productsDB;