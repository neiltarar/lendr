const db = require('../database/db');

const usersProductsDB = {
    getProductAll(email) {
        const sql = "SELECT * FROM users JOIN PRODUCTS ON users.user_id = products.user_id;";
        return db
            .query(sql, [email])
            .then((dbRes) => dbRes.rows);
    },
    addNewProduct(name, description, address, availability, category, user_id) {
        const sql = "INSERT INTO products(name, description, address, availability, category, user_id) VALUES($1, $2, $3, $4, $5, $6)";
        const values = [name, description, address, availability, category, user_id];
        return db.query(sql, values).then((dbRes) => dbRes.rows[0]);
    },
    deleteProduct(id) {
        const sql = "DELETE FROM products WHERE id = $1";
        const values = [id];
        return db.query(sql, values).then((dbRes) => dbRes.rows[0]);
    },
    updateProductParameters(name, description, address, availability, product_id) {
        const sql = "UPDATE products SET name = $1, description = $2, address = $3, availability = $4 WHERE id = $6";
        const values = [name, description, address, availability, product_id];
        return db.query(sql, values).then((dbRes) => dbRes.rows[0]);
    },
    getProductID(user_id) {
        const sql = "SELECT (id) FROM products WHERE user_id = $1;";
        return db
            .query(sql, [user_id])
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

module.exports = usersProductsDB;