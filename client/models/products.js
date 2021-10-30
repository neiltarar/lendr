const db = require('../database/db');

const productsDB = {
    getProductAll(email) {
        const sql = "SELECT * FROM users JOIN PRODUCTS ON users.user_id = products.user_id;";
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
    insertReview(review, rating, authorID, productID) {
        const sql = "INSERT INTO reviews (review , rating, authorid , productid) VALUES ($1 , $2 , $3, $4);";
        db.query(sql, [review, rating, authorID, productID]);
    },
    getProductRatings(productID) {
        const sql = "SELECT rating FROM reviews";
        return db
            .query(sql)
    }
 };
 
 module.exports = productsDB;