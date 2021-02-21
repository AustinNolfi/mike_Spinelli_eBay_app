const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
});

app.get('/home', (req, res) => {
    res.send("You're at the home page")
});
//callback/handler function which executes when app recieves call to specified endpoint & HTTP method