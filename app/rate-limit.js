module.exports = function(app){
	var RateLimit = require('express-rate-limit');

	app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 
	 
	var limiter = new RateLimit({
	  windowMs: 1*60*1000, // 15 minutes 
	  max: 10, // limit each IP to 100 requests per windowMs 
	  delayMs: 0, // disable delaying - full speed until the max limit is reached 
	  message: "The maximum number of requests is 10 per minute. Please wait a few moments and try again."
	});
	 
	//  apply to all requests 
	app.use(limiter);
}