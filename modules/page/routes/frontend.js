const express = require('express')
const frontendSiteRouter = express.Router()

/* home page */
frontendSiteRouter.get('/', function(req, res, next) {
	// res.render(__dirname + '/../views/site', { title: 'Express' });
	res.render('page/page', { title: 'Express' });
});

module.exports = frontendSiteRouter;