const ngrok = require('ngrok');

const conf = require('../conf.js').ngrokTunnels,
      proxyServerConf = require('../conf.js').proxyServer;

(async function() {
  
  const proxyServerURL = await ngrok.connect({
    authtoken: conf.authtoken,
    addr: proxyServerConf.port,
    ...conf.defaults
  })

  console.info('proxyServerURL', proxyServerURL)

})()