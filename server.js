var express = require('express'),
    request = require('request'),
    config = require('./config');

var app = express();

var router = express.Router();

require('./routes/code')(router, request, config);
app.use('/api', router);

app.use(express.static('./public'));

app.listen(config.PORT, 'localhost', function() {
	    console.log('Express server started on localhost: ' + config.PORT);
});
