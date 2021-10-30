-- ****** USERS ******

DROP TABLE IF EXISTS users;
​
CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(100),
    comments VARCHAR(500)
);

INSERT INTO users(username, email, password, comments) 
    VALUES ('xio', 'xiomara.masmela@gmail.com', '123password', 'comment' );

INSERT INTO users(username, email, password, comments) 
    VALUES ('fred', 'fred@gmail.com', '123password', 'comment' );


-- ****** PRODUCTS ******
DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
    id serial PRIMARY KEY,
    name VARCHAR(20),
    description VARCHAR(50),
    address VARCHAR(100),
    availability DATE,
    imageURL VARCHAR(100),
    category VARCHAR(50),
    price INTEGER,
    user_id INTEGER,
    CONSTRAINT FK_products_users FOREIGN KEY (user_id)
            REFERENCES users(user_id)
);

INSERT INTO products(name, description, address, availability, imageURL, category, user_id) 
    VALUES ('Lawnmower', 'Tool for gardening','1 Brisbane City', '1/11/2021','./src/001.jpg' ,'gardening','1' );

INSERT INTO products(name, description, address, availability, category, user_id) 
    VALUES ('Lawnmower2', 'Tool for gardening sfgdfg','3 Brisbane City', '2021-11-15', 'gardening','2' );

--***** REVIEWS ******
DROP TABLE IF EXISTS reviews;

CREATE TABLE IF NOT EXISTS reviews (
    id serial PRIMARY KEY,
    review VARCHAR(150),
    authorID INTEGER,
    productID INTEGER
);

