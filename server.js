const express = require('express');
const path = require('path');
const logger = require('./server/middleware/logger');
const funct_route = require('./server/routes/functServe');

const app = express();
const port = process.env.port || 3000;

//Init Middleware functions
app.use(logger);

//Routes
app.use("/api", funct_route);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//Port set up
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});