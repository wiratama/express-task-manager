const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const session = require('express-session')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const debug = require('debug')('taskApp:server')
const http = require('http')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')

const taskApp = module.exports = express()

// webpack config
const webpackCompiler = webpack(webpackConfig)
taskApp.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}))
taskApp.use(webpackHotMiddleware(webpackCompiler))

// view engine setup
taskApp.set('view engine', 'pug')
taskApp.set('views', path.join(__dirname, './resources/views'))

taskApp.response.message = function(msg){
  let sess = this.req.session

  sess.messages = sess.messages || []
  sess.messages.push(msg)
  
  return this
}

// log
if (!module.parent) taskApp.use(logger('dev'));

// serve static files
taskApp.use(express.static(path.join(__dirname, 'public')));

// session support
taskApp.use(session({
  resave: false,
  saveUninitialized: false,
  secret: '3xpr3$$-t4sk-m4n4g3r'
}));

// parse request bodies (req.body)
taskApp.use(express.urlencoded({ extended: true }))

// allow overriding methods in query (?_method=put)
taskApp.use(methodOverride('_method'));

// expose the "messages" local variable when views are rendered
taskApp.use(function(req, res, next){
  let msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;

  /* This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });
  */

  next();
  req.session.messages = [];
});

// load controllers
require('./core/boot')(taskApp, { verbose: !module.parent })

// catch 404 and forward to error handler
taskApp.use(function(req, res, next) {
  next(createError(404));
})

// error handler
taskApp.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render(path.join(__dirname, './resources/views/errors/error'))
})

/* istanbul ignore next */
const appServer = http.createServer(taskApp)
if (!module.parent) {
  // taskApp.listen(normalizePort(process.env.PORT || '666'))

  // create server
  appServer.listen(normalizePort(process.env.PORT || '666'))
  appServer.on('error', onError)
  appServer.on('listening', onListening)
  console.log('Express started on port 666')
}


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