const path = require('path')

// exports.before = function(req, res, next){
// 	let client = req.params.client;
// 	if (!client) return next('route')
// 	req.client = client
//   	next();
// }

exports.list = function(req, res, next){
	res.render('index')
}

exports.showslug = function(req, res, next){
	res.render('show')
}

exports.apiList = function(req, res, next){
	let dataClient = [
		{
			'nama': 'client-1',
			'phone': '112233'
		},
		{
			'nama': 'client-2',
			'phone': '112233'
		},
		{
			'nama': 'client-3',
			'phone': '112233'
		}
	]
	res.json(dataClient)
}

exports.apiShowslug = function(req, res, next){
	let client = req.params.client
	let dataClient = {
		'client1':{
			'nama': 'client-1',
			'phone': '112233'
		},
		'client2':{
			'nama': 'client-2',
			'phone': '112233'
		},
		'client3':{
			'nama': 'client-3',
			'phone': '112233'
		}
	}
	res.json(dataClient[client])
}