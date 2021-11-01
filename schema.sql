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

INSERT INTO products(name, description, address, availability, imageURL, category, price, user_id) 
    VALUES ('Lawnmower', 'Tool for gardening','1 Brisbane City', '1/11/2021','./src/001.jpg' ,'gardening', '35','1' );





-- ****** MESSAGES ******
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS messages (
    message_id serial PRIMARY KEY,
    date timestamp,
    content VARCHAR(200),
    author_id INTEGER,
    conversation_id INTEGER  REFERENCES conversations(conversation_id) 
);
INSERT INTO messages(date, content, author_id, conversation_id) VALUES ('2021-11-01','HI Fred do you have the landmower', '2', '1');
INSERT INTO messages(date, content, author_id, conversation_id) VALUES ('2021-11-01','HI yes, it is', '1', '1');
INSERT INTO messages(date, content, author_id, conversation_id) VALUES ('2021-11-01','When can I get it?', '2', '1');

SELECT messages.message_id, messages.date, messages.content, messages.author_id, messages.conversation_id, users.user_id, users.username
        FROM messages
        JOIN users 
            ON messages.author_id = users.user_id
        WHERE messages.conversation_id = 1;




-- ****** CONVERSATIONS ******
DROP TABLE IF EXISTS conversations;

CREATE TABLE  conversations (
    conversation_id serial PRIMARY KEY,
    subject VARCHAR(200),
    productOwner_id INTEGER REFERENCES users(user_id),
    sessionUser_id INTEGER REFERENCES users(user_id),
    productID INTEGER
);

INSERT INTO conversations(subject, productOwner_id, sessionUser_id, productID) 
    VALUES ('I want this landmower', '1', '2', '1');




-- Get the product owner name and session current user name and messages
SELECT conversations.conversation_id, conversations.subject, conversations.productid, products.id as productId, products.name as productName, users.user_id as productOwner_id, users.username as productOwner
        FROM conversations
        JOIN products 
            ON conversations.productID=products.id 
        JOIN users
            ON conversations.productOwner_id= users.user_id
        WHERE products.id = 1;

 
--***** REVIEWS ******
DROP TABLE IF EXISTS reviews;

CREATE TABLE IF NOT EXISTS reviews (
    id serial PRIMARY KEY,
    review VARCHAR(150),
    rating INTEGER,
    authorID INTEGER,
    productID INTEGER
);

