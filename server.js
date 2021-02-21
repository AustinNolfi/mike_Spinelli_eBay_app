const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.listen(port, () => {
});

app.get('/', (req, res) => {
    res.send("You're at the home page")
});
//callback/handler function which executes when app recieves call to specified endpoint & HTTP method