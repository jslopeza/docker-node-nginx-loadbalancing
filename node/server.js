var express = require('express'),
	http = require('http'),
	ip = require('ip');
	redis = require('redis');

var app = express();

var port = process.env.PORT || 8080;

console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ' : ' + process.env.REDIS_PORT_6379_TCP_PORT);

var client = redis.createClient('6379', 'redis');

app.get('/', function(req, res, next){
	client.incr('counter', function(err, counter){
		if(err) return next(err);
		console.log('I am at' + ip.address());
		res.send('This page has been viewed ' + counter + ' times!');
	});
});

http.createServer(app).listen(port, function(){
	console.log('Listening on port ' + port);
})