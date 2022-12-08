const proxyServer = {
    port:  59696,
    agent: 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36',
    localAddress: '0.0.0.0',
    auth: {
        user: 'deffuser22',
        pass: 'deffpass22'
    }
}

const restServer = {
    port:  58686,
    localAddress: '0.0.0.0',
    managerHost: 'https://zhtailsc.herokuapp.com'
}

const sshServer = {
    port:  52682,
    localAddress: '0.0.0.0'
}

const ngrokTunnels = {
    authtoken: '2IVJCJvCoJ0mNB0qK67XPVSUWzY_4bpvvFCBaT4rat7AcL7mv',
    defaults: {
        proto: 'tcp',
        region: 'sa'
    }
}

module.exports = {
    proxyServer,
    restServer,
    sshServer,
    ngrokTunnels
}