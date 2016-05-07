module.exports = function(router, request, config) {
	router.get('/personal', function(req, res){
	var profileInfo = [];

	var jsonReturn; 

	var url = 'https://api.github.com/users/' + req.query.owner + '/repos?' + 
			'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET;

	var getRepos = function(callback, compareCallback){	
		request.get({
			url: url,
			headers: { 'user-agent': 'git-technetium'},
			json: true
		}, function(error, response, body) {
			console.log(error);

			var repositories = []; 

			// for (var i=0; i<body.length; i++){
				repositories[0]=body[1].name;
				callback(repositories[0], compareCallback);
			// }


			res.send(body);

		});
	};

	var getCommits = function(repoName, compareCallback){
		var repoUrl = 'https://api.github.com/repos/' + req.query.owner + '/' + repoName + '/commits?' + 
			'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET; 

		request.get({
			url: repoUrl,
			headers: { 'user-agent': 'git-technetium'},
			json: true
		}, function(error, response, body) {

			var commitList = []; 
			console.log(repoName);

			for(var i=0; i<body.length-1; i++){
			try{
				var headAuthor=body[i].committer.login; 

				if (headAuthor==req.query.owner)
				{
					var head = body[i].sha; 
					var base = body[i-1].sha; 

					compareCallback(repoName, head, base);
				}
			}

			catch(err)
			{
				console.log(err);
			}
				// console.log(commitList[i]);

			}
			console.log('\n');

		});
	};


	var compareCommits = function(repoName, head, base)
	{
		var compareUrl = 'https://api.github.com/repos/' + req.query.owner + '/' + repoName + '/compare/' + head + '...' + base +'?' + 
			'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET; 
		request.get({
			url: compareUrl, 
			headers:{ 'user-agent': 'git-technetium', 'Accept': 'application/vnd.github.VERSION.diff'},
			json: true
		}, function(error, response, body) {
			constructJson(repoName, body);


			

		});


	};

	var constructJson = function(repoName, input)
	{

	};

	getRepos(getCommits, compareCommits);
	});
};

