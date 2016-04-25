const hapi = require('hapi');
const routes = require(__dirname + '/router');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/zoo_appDB');

// var options = {
//   bluebird: false,
//   uri: 'mongodb://localhost:3000'
// };

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

module.expots = server;
// server.register({
//   register: require('hapi-mongoose'),
//   options: options
// }, (err) => {
//   if (err) console.log(err);
//
// });
