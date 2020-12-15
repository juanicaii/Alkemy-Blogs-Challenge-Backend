var app = require('../app');
const port = process.env.HOST_PORT;
app.listen(port);
console.log('Open Server in port: ' + port);
