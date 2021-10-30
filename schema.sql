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
    category VARCHAR(50),
    user_id INTEGER UNIQUE,
    CONSTRAINT FK_products_users FOREIGN KEY (user_id)
            REFERENCES users(user_id)
);

INSERT INTO products(name, description, address, availability, category, user_id) 
    VALUES ('Lawnmower', 'Tool for gardening','1 Brisbane City', '1/11/2021', 'gardening','1' );

INSERT INTO products(name, description, address, availability, category, user_id) 
    VALUES ('Lawnmower2', 'Tool for gardening sfgdfg','3 Brisbane City', '2021-11-15', 'gardening','2' );


-- ****** MESSAGES ******
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS messages (
    message_id serial PRIMARY KEY,
    content VARCHAR(200),
    user_id INTEGER,
    conversation_id INTEGER  REFERENCES conversations(conversation_id)
    
);
INSERT INTO messages(content, user_id, conversation_id) VALUES ('HI Fred do you have the landmower', '1', '1');

-- ****** CONVERSATIONS ******
DROP TABLE IF EXISTS conversations;

CREATE TABLE  conversations (
    conversation_id serial PRIMARY KEY,
    subject VARCHAR(200),
    date timestamp,
    productOwner_id INTEGER REFERENCES products(user_id),
    sessionUser_id INTEGER
);

INSERT INTO conversations(subject, date, productOwner_id, sessionUser_id) 
    VALUES ('I want this landmower', '2021-10-29','1', '2');

INSERT INTO conversations(subject, date, productOwner_id, sessionUser_id) 
    VALUES ('is this landmower available', '2021-10-30','1', '3');
 
 
