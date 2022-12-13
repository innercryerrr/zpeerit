const { spawn } = require('child_process');

const locxBinPath = require('../loclx/index.js').bin,
      checkLogin = require('./check-login.js'),
      webServerConf = require('../conf.js').webServer;

(async function() {

  if (!checkLogin()) {
    throw new Error('Fail at checkLogin');
  }

  console.log('locxBinPath', locxBinPath)
  
  let ls = spawn(locxBinPath, [`tunnel`, 'tcp', '--port', webServerConf.port])

  ls.stdout.on('data', (data) => {
    console.log(`stdout: \n\n ${data}`)
  })

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })

})()