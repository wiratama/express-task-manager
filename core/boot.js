const express = require('../')
const fs = require('fs')
const path = require('path')

module.exports = function(parent, options){
	const modulesDir = path.join(__dirname, '..', 'modules')
	const verbose = options.verbose

	let listDirectory = scanDirectory(modulesDir)
	checkController(listDirectory)
	
	// fs.readdirSync(modulesDir).forEach(function(name){
	//   var file = path.join(dir, name)
	//   if (!fs.statSync(file).isDirectory()) return;
	//   verbose && console.log('\n   %s:', name);
	//   var obj = require(file);
	//   var name = obj.name || name;
	//   var prefix = obj.prefix || '';
	//   var app = express();
	//   var handler;
	//   var method;
	//   var url;

	//   // allow specifying the view engine
	//   if (obj.engine) app.set('view engine', obj.engine);
	//   app.set('views', path.join(__dirname, '..', 'modules', name, 'views'));

	//   // generate routes based
	//   // on the exported methods
	//   for (var key in obj) {
	//     // "reserved" exports
	//     if (~['name', 'prefix', 'engine', 'before'].indexOf(key)) continue;
	//     // route exports
	//     switch (key) {
	//       case 'show':
	//         method = 'get';
	//         url = '/' + name + '/:' + name + '_id';
	//         break;
	//       case 'list':
	//         method = 'get';
	//         url = '/' + name + 's';
	//         break;
	//       case 'edit':
	//         method = 'get';
	//         url = '/' + name + '/:' + name + '_id/edit';
	//         break;
	//       case 'update':
	//         method = 'put';
	//         url = '/' + name + '/:' + name + '_id';
	//         break;
	//       case 'create':
	//         method = 'post';
	//         url = '/' + name;
	//         break;
	//       case 'index':
	//         method = 'get';
	//         url = '/';
	//         break;
	//       default:
	//         /* istanbul ignore next */
	//         throw new Error('unrecognized route: ' + name + '.' + key);
	//     }

	//     // setup
	//     handler = obj[key];
	//     url = prefix + url;

	//     // before middleware support
	//     if (obj.before) {
	//       app[method](url, obj.before, handler);
	//       verbose && console.log('     %s %s -> before -> %s', method.toUpperCase(), url, key);
	//     } else {
	//       app[method](url, handler);
	//       verbose && console.log('     %s %s -> %s', method.toUpperCase(), url, key);
	//     }
	//   }

	//   // mount the app
	//   parent.use(app);
	// });
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
		// console.log(dataKey)
		data[dataKey].map(function(item) {
			// console.log(item)
		})
	}
}