const ngrok = require('ngrok');

const conf = require('../conf.js').ngrokTunnels,
      restServerConf = require('../conf.js').restServer;

(async function() {

  const restServerURL = await ngrok.connect({
  	authtoken: conf.authtoken,
  	addr: restServerConf.port,
  	...conf.defaults
  })

  console.info('restServerURL', restServerURL.url)

})()