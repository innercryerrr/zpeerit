const net = require('net'),
      url = require('url'),
      http = require('http'),
      assert = require('assert'),
      debug = require('debug')('proxy'),
      spawn = require('child_process').spawn,
      basicAuthParser = require('basic-auth-parser');

module.exports = pServerBasicAuth;

function pServerBasicAuth (req, fn) {

    const conf = require('../conf.js').proxyServer

    // parse the "Proxy-Authorization" header
    var auth = req.headers['proxy-authorization'];

    // console.log(auth)
    
    if (!auth) {
      // optimization: don't invoke the child process if no
      // "Proxy-Authorization" header was given
      return fn(null, false);
    }

    var parsed = basicAuthParser(auth);

    // console.log('parsed basicAuth', auth)

    debug('parsed "Proxy-Authorization": %j', parsed);

    // spawn a child process with the user-specified "authenticate" command
    // settting env object keys/values //
    var i;
    var env = {};
    for (i in process.env) {
      // inherit parent env variables
      env[i] = process.env[i];
    }
    // add "auth" related ENV variables
    for (i in parsed) {
      env['PROXY_AUTH_' + i.toUpperCase()] = parsed[i];
    }
    // ==================================================================

    process.env.PROXY_AUTH_USERNAME = conf.auth.user;
    process.env.PROXY_AUTH_PASSWORD = conf.auth.pass;
    
    // console.log('....end pserver-basic-auth.js')

    var opts = {};

    opts.stdio = ['ignore', 1, 2];
    opts.env = env;

    var args = ['-c', `if \
    [ "$PROXY_AUTH_USERNAME" = "${process.env.PROXY_AUTH_USERNAME}" ] && \
    [ "$PROXY_AUTH_PASSWORD" = "${process.env.PROXY_AUTH_PASSWORD}" ]; \
      then exit 0; \
    fi; \
    exit 1;`];

    var child = spawn('/bin/sh', args, opts);

    // * -------- inner scope methods ----------- *
    function onerror(err) {
      child.removeListener('exit', onexit);
      return fn(err);
    }

    function onexit(code, signal) {
      debug(
        'authentication child process "exit" event: %s %s',
        code,
        signal
      );
      child.removeListener('error', onerror);
      return fn(null, 0 == code);
    }

    child.once('error', onerror);
    child.once('exit', onexit);
  };