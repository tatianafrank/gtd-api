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

			//Mongo find query does no take strings so must declare and nest objects for each parameter in the query below
			var yearObj = {};
			var countryObj = {};
			var yrange = {};
			var weapObj = {};

			//iterate through each query parameter in url
			for(i = 0; i < queryKeys.length; i++) {
				var qk = queryKeys[i];
				var qv = query[qk];
				//for year paramater create a range value that is >= startyr and <= endyr
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