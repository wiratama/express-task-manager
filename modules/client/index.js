const path = require('path')

// exports.before = function(req, res, next){
// 	let client = req.params.client;
// 	if (!client) return next('route')
// 	req.client = client
//   	next();
// }

exports.list = function(req, res, next){
	res.render('list')
}

exports.showslug = function(req, res, next){
	let client = req.params.client
	res.render('show', { client: client, title: client})
}