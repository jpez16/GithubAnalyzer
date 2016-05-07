var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var crypto = require('crypto');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(path.join(__dirname, '')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

request.post({
        url: 'https://api.github.com',
         body: "mes=heydude"
         }, function(error, response, body){
            console.log(body);
    });



app.listen(app.get('port'), function() {
  console.log('http://localhost:' + app.get('port') + '/');
});


var initialSort = function(input){
	if (newFile)
	{

	}

	else(change)
	{

	}

}

var hashCheck = function(input){

	var fd = fs.createReadStream('./testFileCompare/bootstrap.min.css');

	var hash = crypto.createHash('sha1');
	hash.setEncoding('hex');

	fd.on('end', function() {
	    hash.end();
	    console.log(hash.read());
	});

	fd.pipe(hash);

}; 

var codeCheck = function(input){

}

