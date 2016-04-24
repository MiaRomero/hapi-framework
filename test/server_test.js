/* eslint-env mocha */
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
var port = 3000;
process.env.MONGODB_URI = 'mongodb://localhost/zoo_testDB';
require(__dirname + '/../server');
const Animal = require(__dirname + '/../lib/animal_model');
const errorHandler = require(__dirname + '/../lib/errorHandler');

describe('the server', () => {
  before( (done) => {
    var newAnimal = new Animal({ name: 'Sam', variety: 'snake', age: 3, origin: 'jungle', food: 'mice' });
    newAnimal.save( (err, data) => {
      if (err) return errorHandler(err);
      this.animal = data;
      done();
    });
  });
  after( (done) => {
    mongoose.connection.db.dropDatabase( () => {
      done();
    });
  });
  it('should get all the anmimals in the zoo on a GET request', (done) => {
    request('localhost:' + port)
    .get('/zoo')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body.data)).to.eql(true);
      expect(res.body.data.length).to.eql(1);
      done();
    });
  });
  it('should get a certain animal based on id on a GET request', (done) => {
    request('localhost:' + port)
    .get('/zoo/' + this.animal._id)
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Sam');
      expect(res.body.variety).to.eql('snake');
      expect(res.body.age).to.eql(3);
      expect(res.body.origin).to.eql('jungle');
      expect(res.body.food).to.eql('mice');
      done();
    });
  });
  it('should add a new animal to the DB on a PUT request', (done) => {
    request('localhost:' + port)
    .post('/zoo')
    .send({ name: 'George', variety: 'giraffe', age: 10, origin: 'Kenya', food: 'trees' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('George');
      expect(res.body.variety).to.eql('giraffe');
      expect(res.body.age).to.eql(10);
      expect(res.body.origin).to.eql('Kenya');
      expect(res.body.food).to.eql('trees');
      done();
    });
  });
  it('should update an animal\'s information on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/zoo/' + this.animal._id)
    .send({ name: 'Sam', variety: 'snake', age: 5, origin: 'Florida', food: 'mice' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('Succesfully updated!');
      done();
    });
  });
  it('should remove an animal from the DB on a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/zoo/' + this.animal._id)
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('Succesfully deleted!');
      done();
    });
  });
});
