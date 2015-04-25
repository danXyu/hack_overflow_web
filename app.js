/**
 * Module dependencies.
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var Promise = require('promise');
var connectAssets = require('connect-assets');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var errorHandler = require('errorHandler');


/**
 * Controllers (route handlers)
 */
var homeController = require('./client/controllers/home');
var controlController = require('./client/controllers/control');


/**
 * API keys and passport configuration.
 */
var secrets = require('./config/secrets');


/**
 * Create Express server.
 */
var app = express();


/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function () {
  console.error('MongoDB Connection Error: Please make sure MongoDB is running.');
});


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/client/public'));
app.use(connectAssets({
  paths: [path.join(__dirname, 'client/public/css'), path.join(__dirname, 'client/public/js')]
}));


/**
 * Error Handler.
 */
app.use(errorHandler());


/**
 * Primary app routes.
 */
app.get('/', homeController.getIndex);


/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
  console.log('Express server now listening on port %d in %s mode.', app.get('port'), app.get('env'));
});