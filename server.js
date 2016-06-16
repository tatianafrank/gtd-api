var http = require('http');
var express = require('express');
var app = express();
var routes = require('./app/routes');
var mongo = require('mongodb');

mongo.MongoClient.connect('mongodb://localhost:27017/gtd', function(err, db){
	routes(app, db);
	var server = app.listen(127.0.0.1 || 3000, function () {
	    var port = server.address().port;
	    console.log("App now running on port", port);
	}); 
});