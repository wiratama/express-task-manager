exports.before = function(req, res, next){
	let page = req.params.page;
	if (!page) return next('route')
	console.log(page)
	req.page = page
  	next();
}

exports.showslug = function(req, res, next){
	res.render('page', { page: req.page, title: req.page})
}