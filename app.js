'use strict';

const PORT = process.env.PORT || 3000;

require('dotenv').config();

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var math = require('./math');

var mongoose = require('mongoose');

const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/poke-chess-mine';

mongoose.connect(MONGOURL, err => {
  console.log(err || `MongoDB connected to ${MONGOURL}`);
});



var app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

var server = http.createServer(app);

var io = require('socket.io')(server);


io.on('connection', function(socket) {
  console.log('client connected');

  math.initGame(io, socket);

});

server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
