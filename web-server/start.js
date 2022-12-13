const app = require('./app.js');
const conf = require('../conf.js').restServer

const port = conf.port || process.env.PORT;

app.listen(port, () => {
	console.log('Rest Server app listening on port', port);
})