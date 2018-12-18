// load .env file
require('dotenv').config()

const config = {
	appport: process.env.APPPORT,
	mongo: {
		host: process.env.MONGOHOST,
		port: process.env.MONGOPORT,
		username: process.env.MONGOUSERNAME,
		password: process.env.MONGOPASSWORD,
	}
}

module.exports = config;