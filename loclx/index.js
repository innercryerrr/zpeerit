const path = require('path'),
      os = require('os');

const bins = {
     linux:   '/arm64',   // for linux arm based plats
     win:   '/win.exe', // for windows
  darwin:  '/darwin64' // for mac os
}

const plat = os.platform();

console.log('plat', plat)

var _path = __dirname

if (plat.includes('win') && plat != 'darwin') {
  _path = _path + bins.win;
}

if (plat === 'darwin') {
  _path = _path + bins.darwin;
}

if (plat.includes('linux') || plat.includes('android')) {
  _path = _path + bins.linux;
}

exports.bin = _path;