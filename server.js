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
require('./routes/publicrepo')(router, request, config);
require('./routes/personal')(router, request, config);

app.use('/api', router);

var GitHubApi = require('github');
var github = new GitHubApi({
	version: "3.0.0",
    	headers: {
		"user-agent": "velocity"
	}
});
var oauth2 = require('simple-oauth2')({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  site: 'https://github.com/login',
  tokenPath: '/oauth/access_token',
  authorizationPath: '/oauth/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'http://localhost:' + config.PORT + '/callback',
  scope: 'notifications',
  state: '3(#0/!~'
});

<<<<<<< HEAD
// Initial page redirecting to Github
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
  var code = req.query.code;
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'http://localhost:8000/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth2.accessToken.create(result);
    res.redirect('/');
  }
});

app.get('/login', function(req ,res){
	res.send('<a href="/auth">Log in with Github</a>');
});
app.listen(config.PORT, 'localhost', function() {
		    console.log('Express server started on localhost: ' + config.PORT);
});
//var initialSort = function(input){
//	if (newFile)
//	{

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
