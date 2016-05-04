var fs = require('fs');
var http2 = require('http2');
var autoPush = require('auto-push');
var serveStatic = require('serve-static');

var opts = {
  key: fs.readFileSync(__dirname + '/ssl/key.pem'),
  cert: fs.readFileSync(__dirname + '/ssl/crt.pem')
};

var app = serveStatic(__dirname + '/public');

var server = http2.createServer(opts, autoPush(app));

server.listen(8443);
