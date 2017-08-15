var mongoose = require('mongoose');
var fs = require('fs');

var models_path = __dirname + '/../models';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/loginpractice')

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') != -1){
		console.log('loading ' + file + '...');
		require(models_path + '/' + file);
	}
})
