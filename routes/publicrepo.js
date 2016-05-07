module.exports = function(router, request, config) {
	router.get('/publicrepo', function(req, res){
	var publicrepo = [];
	var contributorList;
	var getContributors = function(repo, callback){
		var url = 'https://api.github.com/repos/' + repo.full_name+ '/contributors' + '?' 			+ 'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET;
		request.get({
			url: url,
			headers: { 'user-agent': 'velocity' },
			json: true
		}, function(error, response, body) {
			var sum = 0;
			var u = 0;
			for (var i = 0; i < body.length; i++) {
				var c = body[i];
				var t = parseInt(c.contributions);
				if (!isNaN(t)) { 
					sum += t;
				}
				if (c.login == req.query.owner) {
					if (!isNaN(c.contributions)) {
						u = t;		
					}
				}
			}
			var percent = u / sum;
			console.log(percent);
			callback({
				repo: repo,
				percent: percent
			});
		});
	};

	var getRepo = function(){	
		var url = 'https://api.github.com/users/' + req.query.owner + '/repos' + '?' + 
			'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET;
		request.get({
			url: url,
			headers: { 'user-agent': 'velocity' },
			json: true
		}, function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var count = 0;
				var publicNum = 0;
				for (var repoIndex = 0; repoIndex < body.length; repoIndex++) {
					if (body[repoIndex].fork) {
						publicNum++;
					}
				}
				for (var repoIndex = 0; repoIndex < body.length; repoIndex++) {
					if (body[repoIndex].fork) {
						console.log(body[repoIndex].full_name);
							
						var t = {
							id: body[repoIndex].id,
							description: body[repoIndex].description,
							full_name: body[repoIndex].full_name,
							forks: body[repoIndex].forks,
							stargazers_count: body[repoIndex].stargazers_count
						};
						
						getContributors(t, function(data){
							count++;
							publicrepo.push(data);
							if (count == publicNum) {
								res.send(publicrepo);
							}
						});
					}	
				}
			}
			
		});
	};
	getRepo();
	});
};

