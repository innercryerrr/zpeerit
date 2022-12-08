const pm2 = require('pm2');

module.exports = function () {
  
  console.log(' Event from front:', 'start-clicked')
  console.info('Initializing pm2.connect() plus scripts...')

  pm2.connect(async function (err) {
    
    if (err) {
      console.error(err)
      process.exit(2)
    }

    console.info('Initializing proxyServer process..')
    
    await setTimeout(async function() {
        await pmStart('./proxy-server/start.js', 'proxyServer')
    }, 1000)

    console.info('Initializing restServer process..')
    
    await setTimeout(async function() {
      await pmStart('./rest-server/start.js', 'restServer')
    }, 2000)

      console.info('Initializing restServer process..')
    
    if (require('ssh2')) {
    	await setTimeout(async function() {
	      await pmStart('./ssh-server/start.js', 'sshServer')
	    }, 3000)
    }

    // then...
    // await pmStart('./ngrok-tunnels/proxy-server.js', 'ngrok-proxy-server-tunnel')
    // await pmStart('./ngrok-tunnels/rest-server.js', 'ngrok-rest-server-tunnel')

    console.log(' pm2.connect() plus scripts loaded.')
  })
}