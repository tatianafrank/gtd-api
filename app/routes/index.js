module.exports = function(app, db) {
	var url = require('url');

	app.get('/*', function(req, res) {
		var parsedUrl = url.parse(req.url, true);
		if(parsedUrl){
			parseQuery(parsedUrl)
		}

		function parseQuery(parsedUrl) {
			var query = parsedUrl.query;
			var queryKeys = Object.keys(query);
			//paramater objects for nested mongo query object-- mongo find does not accept strings, only object
			var yearObj = {};
			var countryObj = {};
			var yrange = {};
			var weapObj = {};

			for(i = 0; i < queryKeys.length; i++) {
				var qk = queryKeys[i];
				var qv = query[qk];
				if(qk == 'startyr'){	
					yrange['$gte'] = Number(qv);
					yearObj['iyear'] = yrange;
					
				}
				else if(qk == 'endyr') {
					yrange['$lte'] = Number(qv);
					yearObj['iyear'] = yrange;
				}
				else if(qk == 'country'){
					var inRange = getRange(qv);
					countryObj['country'] = inRange;
				}
				else if (qk = 'weapon'){
					var inRange = getRange(qv);
					weapObj['weaptype1'] = inRange;
				}
			}
			searchDb(yearObj, countryObj, weapObj);
		}

		function getRange(obj){
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
		
		function searchDb(yearObj, countryObj, weapObj){
			var allQueries = [];
			var queryStr = {};
			//push year outside of loop since it has a start and end and may be out of order
			allQueries.push(yearObj, countryObj, weapObj);
			queryStr['$and'] = allQueries;
			var test = db.collection('allData').find(queryStr).toArray(function(err, data){
				if(err) {
					res.error(err);
				} else {
					res.json(data);
				}
				db.close();
			});
		}
		
	});
}