const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("client"));

app.get('/', (req, res) => {
    res.send('hello')
  });


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});