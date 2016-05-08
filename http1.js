var http = require('http');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');

var root = __dirname + '/public';

var serveStatic = serveStatic(root);

var server = http.createServer((req, res) => {
  var done = finalhandler(req, res);
  serveStatic(req, res, done);
});

server.listen(3000);
