var http = require('http');
var express = require('express');
var app = express();
var routes = require('./app/routes');
var mongo = require('mongodb');

mongo.MongoClient.connect('mongodb://localhost:27017/gtd', function(err, db){
	if(err){
		console.log(err);
	}
	routes(app, db);
	var server = app.listen('104.131.99.148:80', function () {
	    console.log("App now running on port");
	}); 
});