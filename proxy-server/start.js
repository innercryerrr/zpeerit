const proxyServerSetup = require('./proxy-server-setup.js');
const conf = require('../conf.js').proxyServer;

var proxyServer = proxyServerSetup(false, conf), // false autocreates root webserver
	port = conf.port || process.env.PORT;

proxyServer.listen(port, function () {
	console.log('HTTP(s) Proxy Server listening on port', port);
})