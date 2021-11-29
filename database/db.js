const pg = require("pg");
const dotevn = require("dotenv");
dotevn.config();

const db =
  process.env.NODE_ENV === "production"
    ? new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new pg.Pool({
        user: process.env.DB_USERNAME,
        database: "lendr",
        password: process.env.DB_PASSWORD,
      });

module.exports = db;

// const db = new pg.Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: process.env.USE_SSL==='true'
//     }
//   });

// module.exports = db;
