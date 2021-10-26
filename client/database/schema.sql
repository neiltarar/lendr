DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(100),
    comments VARCHAR(500)
);

INSERT INTO users (email, password) VALUES ('lucy@example.com', '1234')