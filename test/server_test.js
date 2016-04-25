const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
process.env.MONGODB_URI = 'mongodb://localhost/zoo_testDB';
const server = require(__dirname + '/../lib/server');
const Animal = require(__dirname + '/../models/animal_model');

describe('the server', () => {
  after((done) => {
    server.stop(() => {
      done();
    });
  });
});
describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
});
it('should create an animal', (done) => {
  request('localhost:3000')
  .post('/zoo')
  .send({ name: 'george', variety: 'snake', age: 20, food: 'mice' })
  .end((err, res) => {
    expect(err).to.eql(null);
    expect(res.body.name).to.eql('george');
    expect(res.body.variety).to.eql('snake');
    expect(res.body.age).to.eql(20);
    expect(res.body.origin).to.eql('zoo');
    expect(res.body.food).to.eql('mice');
    done();
  });
});
});

describe('The GET method', () => {
  it('should get all the animals', (done) => {
    request('localhost:3000')
    .get('/zoo')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.statusCode).to.eql(200);
      expect(res.body.message).to.eql('Here are all the animals in the zoo: ');
      done();
    });
  });
});

describe('routes that need animals in the DB', () => {
  beforeEach((done) => {
    var newAnimal = new Animal({ name: 'test', variety: 'tests', age: 10,
     origin: 'test, tests', food: 'souls' });
    newAnimal.save((err, data) => {
      console.log(err);
      this.animal = data;
      done();
    });
  });
  afterEach((done) => {
    this.animal.remove((err) => {
      console.log(err);
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should show a single animal when shown on a GET request', (done) => {
    request('localhost:3000')
    .get('/zoo/' + this.animal._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('test');
      expect(res.body.variety).to.eql('tests');
      expect(res.body.age).to.eql(10);
      expect(res.body.origin).to.eql('test, tests');
      expect(res.body.food).to.eql('souls');
      done();
    });
  });
  it('should change the animal\'s identity on a PUT request', (done) => {
    request('localhost:3000')
    .put('/zoo/' + this.animal._id)
    .send({ name: 'frank', variety: 'bear', age: 13,
    origin: 'california', food: 'fish' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Succesfully updated!');
      done();
    });
  });
it('should delete an animal on a DELETE request', (done) => {
  request('localhost:3000')
  .delete('/zoo/' + this.animal._id)
  .end((err, res) => {
    expect(err).to.eql(null);
    expect(res.body.msg).to.eql('Succesfully deleted!');
    done();
    });
  });
});

describe('server error', () => {
  it('should error on a bad request', (done) => {
    request('localhost:3000')
    .get('/badroute')
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res.body.statusCode).to.eql(404);
      expect(res.body.error).to.eql('Not Found');
      done();
    });
  });
});
