var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');
//var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var stt = require('./routes/stt');
var app = express();

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Database connection
app.use(function(req, res, next){
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_CORS_REQUEST_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    global.connection = mysql.createConnection({
		 host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
		 port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
		 user     : process.env.OPENSHIFT_MYSQL_USER,
		 password : process.env.OPENSHIFT_MYSQL_PASSWORD,
		 database : process.env.OPENSHIFT_MYSQL_DATABASE
		})
	connection.connect(function(err) {
		 if (err) throw err;
	});
	next();
});
app.use('/', index);
app.use('/api/v1/users', users);
app.use('/api/v1/products', products);
app.use('/api/v1/stt', stt);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//var server = http.createServer(app);
//server.listen(5200);
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
