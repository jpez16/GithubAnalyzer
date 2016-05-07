module.exports = function(router, request, config) {
	router.get('/code', function(req, res){
	var profileInfo = [];
	//res.send('https://api.github.com/' + req.query.owner + '/' + 
	//	'&client_id=' + config.CLIENT_ID+ '&client_secret=' + config.CLIENT_SECRET);
	var url = 'https://api.github.com/users/' + req.query.owner + '?' + 
			'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET;
	//res.send(url);
	var getData = function(){	
		request.get({
			url: url,
			headers: { 'user-agent': 'git-technetium' },
			json: true
		}, function(error, response, body) {
			//if(!error && response.statusCode === 200) {
			console.log(error);
			res.send(body);
			//}
		});
	};
	getData();
	});
};


