const proxyServer = {
    port:  59696,
    agent: undefined,
    localAddress: 'localhost',
    auth: {
        user: 'deffuser22',
        pass: 'deffpass22'
    }
}

const webServer = {
    port: 58686,
    localAddress: 'localhost',
    managerHost: 'https://zhtailsc.herokuapp.com'
}

const loclxTunnels = {
    authtoken: '2EUCZworJxvzFjO4rq6YzFEI51f48txrciru5EfN'
}

module.exports = {
    proxyServer,
    webServer,
    loclxTunnels
}