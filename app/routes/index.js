module.exports = function(app, db) {
	var url = require('url');
	var rateLimit = require('../rate-limit.js');

	rateLimit(app);

	app.get('/', function(req, res) {
		res.send('Please enter query parameters to search the database');
	});

	app.get('/search/*', function(req, res) {
		var parsedUrl = url.parse(req.url, true);

		if(parsedUrl){
			var query = parsedUrl.query;
			var queryKeys = Object.keys(query);

			if(queryKeys.length > 0){
				buildQuery(query, queryKeys);
			}
		}

		function buildQuery(query, queryKeys) {

			//Mongo find query does not take strings so must declare and nest objects for each parameter in the query below
			var yearObj = {};
			var yrange = {};
			var paramArr = [];
			

			//Iterate through each query parameter provided by user in url
			for(i = 0; i < queryKeys.length; i++) {
				var qk = queryKeys[i]; //query key
				var qv = query[qk]; //query value

				if(qk == 'startyr'){	
				//for year paramater create a range value that is >= start year and < end year
					yrange['$gte'] = Number(qv);
					yearObj['iyear'] = yrange;
				}
				else if(qk == 'endyr') {
					yrange['$lt'] = Number(qv);
					yearObj['iyear'] = yrange;
				}
				else if (qk == 'weaptype1' || 'attacktype1' || 'targtype1' || 'country') {
					var inRange = getRange(qv);
					var pObj = {};
					pObj[qk] = inRange;
					paramArr.push(pObj);
				}
				else if (qk == 'gname'){
					if (typeof qv == 'object') {
						var inRange = {};
						inRange['$in'] = [];
						for(i=0; i < qv.length; i++){
							inRange['$in'].push(qv[i]);
						}
						paramArr.push(inRange);
					} else {
						var qObj = {};
						qObj[qk] = qv;
						paramArr.push(qObj);
					}
				}
			}
			paramArr.push(yearObj)
			console.log(paramArr);
			searchDb(paramArr);
			//calls searchDB with all the mongo db query objects in one arrauy 
		}

		function getRange(obj) {
			//creates "$in" object for paramaters with more than one value for a single key
			var inRange = {};
			inRange['$in'] = [];
			if (typeof obj == 'object') {
				for(i=0; i < obj.length; i++){
					inRange['$in'].push(Number(obj[i]));
				}
			} else {
				inRange['$in'].push(Number(obj));
			}
			return inRange;
		}
		
		function searchDb(paramArr) {
			var queryStr = {};
			queryStr['$and'] = paramArr;
			var result = db.collection('allData').find(queryStr).toArray(function(err, data) {
				if(err) {
					console.log(err);
					return res.send(err);
				} 
				if(data.length) {
					return res.json(data);
				} else {
					return res.send('No records matched your search.')
				}
				db.close();
			});
		}
		
	});
}