module.exports = function(router, request, config) {
	router.get('/personal', function(req, res){
	
	var parse = require('parse-diff');

	var jsonReturn = {'abc':'def'}; 

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
				var headAuthor=body[0].committer.login; 

				if (headAuthor==req.query.owner)
				{
					var base = body[0].sha; 
					var head = body[i+1].sha;
					// var head = body[1].sha;  

					compareCallback(repoName, head, base);
				}
			}

			catch(err)
			{
				console.log(err);
			}
				console.log(commitList[i]);

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
		var diff = input; 
		var files = parse(diff);
		console.log("NUMFILES " + files); 

		files.forEach(function(file) {
		console.log('num of chunks ' + file.chunks.length); // number of hunks 
		// console.log('chunk added/deleted ' + file.chunks[0].changes) // hunk added/deleted/context lines 
		// each item in changes is a string 

		for (var key in file.chunks[0].changes)
		{
			console.log(file.chunks[0].changes[key]);
		}
		console.log('num of deletions ' + file.deletions); // number of deletions in the patch 
		console.log('num of additions ' + file.additions); // number of additions in the patch 
		console.log('fileName ' + JSON.stringify(file.chunks[0] )	);


	});
	};

	getRepos(getCommits, compareCommits);
	});
};

