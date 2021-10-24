const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const sessionAuth = require('./client/middleware/sessionAuth');
const sessionLogger = require('./client/middleware/logger');
const sessionController = require('./client/controllers/sessions');

app.use(express.static("client"));
app.use(express.json());

app.use("/" , sessionLogger);
app.use("/api/sessionAuth" , sessionAuth);
app.use("/api/sessions" , sessionController);


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});