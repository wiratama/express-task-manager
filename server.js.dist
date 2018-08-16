const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const methodOverride = require('method-override')
const debug = require('debug')('taskApp:server');
const http = require('http')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')
const taskApp = module.exports = express()

const frontendSiteRouter = require('./modules/site/routes/frontend')
taskApp.use('/', frontendSiteRouter)

// webpack config
const webpackCompiler = webpack(webpackConfig)

taskApp.use(webpackDevMiddleware(webpackCompiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: { colors: true }
}))

taskApp.use(webpackHotMiddleware(webpackCompiler))

// view engine setup
taskApp.set('views', path.join(__dirname, './resources/views'))
taskApp.set('view engine', 'pug')

// load controllers
require('./core/boot')(taskApp, { verbose: !module.parent });

// catch 404 and forward to error handler
taskApp.use(function(req, res, next) {
	next(createError(404));
});

// error handler
taskApp.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	console.log(err);
	res.render(path.join(__dirname, './resources/views/errors/error'));
});

taskApp.use(logger('dev'));
taskApp.use(express.json());
taskApp.use(express.urlencoded({ extended: false }));
taskApp.use(cookieParser());
taskApp.use(express.static(path.join(__dirname, 'public')));

// port
const port = normalizePort(process.env.PORT || '666');
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