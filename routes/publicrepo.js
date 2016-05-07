module.exports = function(router, request, config) {
	router.get('/publicrepo', function(req, res){
	var publicrepo = [];
	var contributorList = []; 
	var getContributors = function(fullName, callback){
		var url = 'https://api.github.com/repos/' + fullName+ '/contributors' + '?' 			+ 'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET;
		request.get({
			url: url,
			headers: { 'user-agent': 'velocity' },
			json: true
		}, function(error, response, body) {
			callback(body);
			//contributorList.push(body);
		});
	};

	var getData = function(){	
		var url = 'https://api.github.com/users/' + req.query.owner + '/repos' + '?' + 
			'client_id=' + config.CLIENT_ID + '&client_secret=' + config.CLIENT_SECRET;
		request.get({
			url: url,
			headers: { 'user-agent': 'velocity' },
			json: true
		}, function(error, response, body) {
			if(!error && response.statusCode === 200) {
				for (var repoIndex = 0; repoIndex < body.length; repoIndex++) {
					if (body[repoIndex].fork) {
						getContributors(body[repoIndex].full_name);
						publicrepo.push({
							id: body[repoIndex].id,
							description: body[repoIndex].description,
							full_name: body[repoIndex].full_name,
							created_at: body[repoIndex].created_at,
							size: body[repoIndex].size,
							has_wiki: body[repoIndex].has_wiki,
							forks: body[repoIndex].forks,
							stargazers_count: body[repoIndex].stargazers_count
						});
					}	
				}
				var points = 0;
				for (var i = 0; i < publicrepo.length; i++) {
					points = points + publicrepo[i].forks;
				}
				res.send(publicrepo);
			}
			
		});
	};
	getData();
	});
};


