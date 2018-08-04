const express = require('express')
const frontendSiteRouter = express.Router()

/* home page */
frontendSiteRouter.get('/', function(req, res, next) {
	// res.render(__dirname + '/../views/site', { title: 'Express' });
	res.render('site/site', { title: 'Express' });
});

module.exports = frontendSiteRouter;