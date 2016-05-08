var fs = require('fs');
var http2 = require('http2');

var opts = {
  key: fs.readFileSync(__dirname + '/ssl/key.pem'),
  cert: fs.readFileSync(__dirname + '/ssl/crt.pem')
};

var root = __dirname + '/public';

var assets = [
  '/bower_components/bootstrap/dist/css/bootstrap.min.css',
  '/bower_components/jquery/dist/jquery.min.js',
  '/bower_components/bootstrap/dist/js/bootstrap.min.js',
  '/style.css',
];

var server = http2.createServer(opts, (req, res) => {
  if ( req.url === '/' ) {
    assets.forEach((asset) => {
      var push = res.push(asset);
      push.writeHead(200);
      fs.createReadStream(root + asset).pipe(push);
    });
    fs.createReadStream(root + '/index.html').pipe(res);
  }
  else {
    fs.createReadStream(root + req.url).pipe(res);
  }
});

server.listen(8443);
