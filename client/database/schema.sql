DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    userID serial PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(100),
    comments VARCHAR(500)
);

-- INSERT INTO users (email, password) VALUES ('lucy@example.com', '1234')

DROP TABLE IF EXISTS conversations;

CREATE TABLE IF NOT EXISTS conversations(
    messageID serial PRIMARY KEY,
    subject VARCHAR(30),
    product_id INTEGER NOT NULL,
    conversation_id INTEGER NOT NULL
);

DROP TABLE IF EXISTS messages; 

CREATE TABLE IF NOT EXISTS messages(
    conversationID serial PRIMARY KEY,
    content VARCHAR(200),
    date TIMESTAMP, 
    time TIMESTAMPTZ,
    productOwnerID serial INTEGER,
    sessionUserID serial INTEGER
);



