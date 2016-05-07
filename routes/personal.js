module.exports = function(router, request, config) {
	router.get('/personal', function(req, res){
	var profileInfo = [];
	var url = 'https://api.github.com/users/' + req.query.owner + '/repos?' + 
			'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET;
	var getRepos = function(){	
		request.get({
			url: url,
			headers: { 'user-agent': 'git-technetium', 'Accept': 'application/vnd.github.VERSION.diff'},
			json: true
		}, function(error, response, body) {
			console.log(error);

			var repositories = []; 

			for (var i=0; i<body.length; i++){
				repositories[i]=body[i].name;
			}


			res.send(repositories[2]);
			// res.send(body);

		});
	};

	// var getCommits = function(){
	// 	request.get({
			

	// 	})
	// }



	getRepos();
	});
};

