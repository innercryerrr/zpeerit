const { spawn } = require('child_process');

const locxBinPath = require('../loclx/index.js').bin,
      checkLogin = require('./check-login.js'),
      proxyServerConf = require('../conf.js').proxyServer;

(async function() {

  if (!checkLogin()) {
    throw new Error('Fail at checkLogin');
  }

  console.log('locxBinPath', locxBinPath)
  
  let ls = spawn(locxBinPath, [`tunnel`, 'tcp', '--port', proxyServerConf.port])

  ls.stdout.on('data', (data) => {
    console.log(`stdout: \n\n ${data}`, '\n')
  })

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })

})()