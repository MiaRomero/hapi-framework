const hapi = require('hapi');
const routes = require(__dirname + '/lib/router');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/zoo_appDB');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

server.route(routes);

server.start( (err) => {
  if (err) throw err;
  console.log('Server running at: ', server.info.uri);
});
