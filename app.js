//* Require packages from node

//* Require packages from third-parties
const express = require('express');

//* Require custom packages

const app = express();

app.get('/test', (req, res, next) => {
    console.log('hi')
    next();
})

app.listen(8080);