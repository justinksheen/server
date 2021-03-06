// Dependencies
var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var mongoose = require('mongoose');

// Configuration
var config = require('./config/server');

// Database
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('Connected to database');
});

var app = express();
app.set('port', process.env.PORT || 3000);

// Setup middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(busboy());

var server = http.createServer(app);

var port = app.get('port');
server.listen(port);
console.log('Listening on port ' + port);

// Load server router
require('./router')(app);
