const express = require('express')
const fs = require('fs')
const path = require('path')

module.exports = function(parent, options){
	const dir = path.join(__dirname, '..', 'modules')
	const verbose = options.verbose
	
	fs.readdirSync(dir).forEach(function(name){
		let file = path.join(dir, name)
		if (!fs.statSync(file).isDirectory()) return;
		verbose && console.log('\n   %s:', name)
		
		let obj = require(file)
		name = obj.name || name
		let prefix = obj.prefix || ''
		let taskApp = express()
		let handler
		let method
		let url

		if (obj.engine) taskApp.set('view engine', obj.engine)
		taskApp.set('views', path.join(__dirname, '..', 'modules', name, 'views'))

		for (let key in obj) {
			if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
			console.log(key+' - nama key')
		    switch (key) {
			    case 'showslug':
			        method = 'get'
			        url = '/' + name + 's/:' + name
			        break
			    case 'show':
			        method = 'get'
			        url = '/' + name + '/:' + name + '_id'
			        break
			    case 'list':
			        method = 'get'
			        url = '/' + name + 's'
			        break
			    case 'edit':
			        method = 'get'
			        url = '/' + name + '/:' + name + '_id/edit'
			        break
			    case 'update':
			        method = 'put'
			        url = '/' + name + '/:' + name + '_id'
			        break
			    case 'create':
			        method = 'post'
			        url = '/' + name
			        break
			    case 'index':
			        method = 'get'
			        url = '/'
			        break
			    default:
			    	method = 'get'
			        url = '/' + name + '/:' + name + '_id'
			        break
			        // throw new Error('unrecognized route: ' + name + '.' + key)
		    }

		    handler = obj[key]
		    url = prefix + url

		    if (obj.before) {
		      taskApp[method](url, obj.before, handler)
		      verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), url, key)
		    } else {
		      taskApp[method](url, handler)
		      verbose && console.log('     %s %s -> %s', method.toUpperCase(), url, key)
		    }
		}

		parent.use(taskApp);
	});
}

// recursive scan directory
function scanDirectory(directory, filelist = []) {
	fs.readdirSync(directory).forEach(function(dirName, dirKey){
		let file = path.join(directory, dirName)

		if (!fs.statSync(file).isDirectory()) {
			if(typeof filelist[directory] === 'undefined' || filelist[directory].length ===0) {
				filelist[directory] = []
			}

			filelist[directory].push(dirName)
		} else {
			return scanDirectory(path.join(file), filelist)
		}

	})
	
	return filelist
}

function checkController(data) {
	for (dataKey in data) {
		// objData = require(path.join(dataKey))
		// console.log(objData)
		// data[dataKey].map(function(item) {
		// 	// console.log(item)
		// })
	}
}