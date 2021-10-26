const pg = require('pg');
const dotevn = require('dotenv');
dotevn.config();

if (process.env.NODE_ENV === 'production') {
    db = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
}else{
    const db = new pg.Pool({
        user: 'postgres',
        database: 'lendr',
        password: process.env.DB_PASSWORD
    });
    module.exports = db;
};