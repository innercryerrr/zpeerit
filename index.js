const pm2 = require('pm2');

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

  console.info('Initializing locxTunnels...')
  
  await setTimeout(async function() {
    await pmStart('./tunnels.js', 'locx-tunnels')
  }, 3000)

  console.log(' pm2.connect() plus scripts loaded.')

})

async function pmStart (script, name) {

  if (!script || !name) {
    throw new Error('no "script" or "name" arguments provided.')
  }

  await pm2.start({
    script,
    name,
    // watch: true,
    // watchDelay: 1000
  }, function(err, apps) {
    
    if (err) {
      console.error(err)
      return pm2.disconnect()
    }

    pm2.list((err, list) => {
  
      if (err) {
        console.error(err, list)
      }

      pm2.restart('api', (err, proc) => {
        pm2.disconnect()
      })
  
    })
  })
}