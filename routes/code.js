module.exports = function(router, request, config) {
	router.get('/code', function(req, res){
	var profileInfo = [];
	var url = 'https://api.github.com/users/' + req.query.owner + '?' + 
			'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET;
	var getData = function(){	
		request.get({
			url: url,
			headers: { 'user-agent': 'git-technetium'},
			json: true
		}, function(error, response, body) {
			console.log(error);
			res.send(body);
		});
	};
	getData();
	});
};


