const locxBinPath = require('../loclx/index.js').bin,
      conf = require('../conf.js').loclxTunnels;

function checkAccessToken () {
  
  const atoken = process.env.ACCESS_TOKEN;

  if (!atoken) {
    process.env.ACCESS_TOKEN = conf.authtoken;
  }

  console.log('ACCESS_TOKEN', process.env.ACCESS_TOKEN)

  return true;
}

module.exports = checkAccessToken;

