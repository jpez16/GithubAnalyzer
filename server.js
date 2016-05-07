var express = require('express'),
    request = require('request'),
    config = require('./config'),
    fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'), 
	crypto = require('crypto');

var app = express();


app.use('/', express.static(path.join(__dirname, '')));
app.use(bodyParser.json());

var router = express.Router();

require('./routes/code')(router, request, config);
require('./routes/personal')(router, request, config);

app.use('/api', router);


app.listen(config.PORT, 'localhost', function() {
	    console.log('Express server started on localhost: ' + config.PORT);
});




// var initialSort = function(input){
// 	if (newFile)
// 	{

// 	}

// 	else(change)
// 	{

// 	}

// }

// var hashCheck = function(input){

// 	var fd = fs.createReadStream('./testFileCompare/bootstrap.min.css');

// 	var hash = crypto.createHash('sha1');
// 	hash.setEncoding('hex');

// 	fd.on('end', function() {
// 	    hash.end();
// 	    console.log(hash.read());
// 	});

// 	fd.pipe(hash);

// }; 

// var codeCheck = function(input){

// };
