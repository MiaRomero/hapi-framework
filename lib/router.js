'use strict';
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
  method: 'GET',
  path: '/zoo/{animal_id}',
  handler: function(req, reply) {
    Animal.findById(req.params.animal_id, (err, animal) => {
      if (err) return errorHandler(err);
      reply(animal);
    });
  }
},
{
  method: 'POST',
  path: '/zoo',
  handler: function(req, reply) {
    let newAnimal = new Animal(req.payload);
    newAnimal.save((err, data) => {
      if (err) return errorHandler(err);
      reply(data);
    });
  }
},
{
  method: 'PUT',
  path: '/zoo/{animal_id}',
  handler: function(req, reply) {
    Animal.findByIdAndUpdate(req.params.animal_id, req.payload, (err, animal) => {
      if (err) return errorHandler(err);

      animal.save((err) => {
        if (err) return errorHandler(err);

        reply('Succesfully updated!');
      });
    });
  }
},
{
  method: 'DELETE',
  path: '/zoo/{animal_id}',
  handler: function(req, reply) {
    Animal.remove({
      _id: req.params.animal_id
    }, (err) => {
      if (err) return errorHandler(err);
      reply('Succesfully deleted!');
    });
  }
}];
