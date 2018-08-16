const path = require('path')

exports.before = function(req, res, next){
	let page = req.params.page;
	if (!page) return next('route')
	req.page = page
  	next();
}

exports.showslug = function(req, res, next){
	res.render('page', { page: req.page, title: req.page})
}