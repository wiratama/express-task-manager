const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const methodOverride = require('method-override')
const debug = require('debug')('myapp:server');
const http = require('http')
const webpack = requiere('webpack')
const webpackDevMiddleware = requiere('webpack-dev-middleware')
const webpackHotMiddleware = requiere('webpack-hot-middleware')
const taskApp = express()

const frontendSiteRouter = require('./modules/site/routes/frontend')
taskApp.use('/', frontendSiteRouter)

// catch 404 and forward to error handler
taskApp.use(function(req, res, next) {
	next(createError(404));
});

// error handler
taskApp.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('errors/error');
});

// view engine setup
taskApp.set('views', path.join(__dirname, 'views'));
taskApp.set('view engine', 'pug');

taskApp.use(logger('dev'));
taskApp.use(express.json());
taskApp.use(express.urlencoded({ extended: false }));
taskApp.use(cookieParser());
taskApp.use(express.static(path.join(__dirname, 'public')));

// port
const port = normalizePort(process.env.PORT || '3000');
taskApp.set('port', port);

// create server
const appServer = http.createServer(taskApp);
appServer.listen(port);
appServer.on('error', onError);
appServer.on('listening', onListening);

function normalizePort(val) {
	let port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	let bind = typeof port === 'string'
	? 'Pipe ' + port
	: 'Port ' + port;

	switch (error.code) {
	case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	default:
		throw error;
	}
}

function onListening() {
	let addr = appServer.address();
	let bind = typeof addr === 'string'
	? 'pipe ' + addr
	: 'port ' + addr.port;
	debug('Listening on ' + bind);
}