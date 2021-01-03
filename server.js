require('rootpath')();
const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cor =require('cors');
var path = require('path');
var router = express.Router();
var upload = require('app/config/multer.config');
const errorHandler = require('app/config/error-handler');

//dbConnection
require('./app/config/dbConnection');

//routes
require('app/config/routes')(app);
//require('app/routes/file.router')(app, router, upload);

//middelware
app.use( '/api',express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cor());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// global error handler
app.use(errorHandler);

// Create a Server
const port = process.env.PORT || 3000;
var host = process.env.host || 'localhost';
app.listen(port, () =>
console.log("App listening at http://%s:%s", host, port));
