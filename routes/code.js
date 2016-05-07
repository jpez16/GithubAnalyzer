module.exports = function(router, request, config, github) {
	router.get('/code', function(req, res){
		/*github.user.getFollowingFromUser({
			 user: req.query.owner
		}, function(err, res, body) {
			    console.log(JSON.stringify(res));
			    res.send(body);
		});*/

		var url = 'https://api.github.com/users/' + req.query.owner + '?'
			//+ '?' + 'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET;
		var getData = function(){	
			request.get({
				url: url,
				headers: { 'user-agent': 'git-technetium'},
				json: true
			}, function(error, response, body) {
				res.send(body);
			});
		};
		getData();
	});
};


