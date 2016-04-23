const Animal = require(__dirname + '/animal_model');
const errorHandler = require(__dirname + '/errorHandler.js');

module.exports = [
{
  method: 'GET',
  path: '/zoo',
  handler: function(req, reply) {
    Animal.find(null, (err, data) => {
      if (err) return errorHandler(err);
      reply({
        statusCode: 200,
        message: 'Here are all the animals in the zoo: ',
        data: data
      });
    });
  }
},
{
  method: 'POST',
  path: '/zoo',
  handler: function(req, res) {
  }
},
{
  method: 'PUT',
  path: '/zoo',
  handler: function(req, res) {
  }
},
{
  method: 'DELETE',
  path: '/zoo',
  handler: function(req, res) {
  }
}];
