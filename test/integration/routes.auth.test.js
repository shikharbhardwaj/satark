process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');

chai.use(chaiHttp);
passportStub.install(server);

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    passportStub.logout();
    return knex.migrate.rollback();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send({
          username: 'michael',
          password: 'herman',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should log in a user', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'jeremy',
          password: 'johnson123',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          done();
        });
    });

    it('should not login an unregistered user', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          username: 'michael',
          pasword: 'haha',
        })
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.status.should.eql('not found');
          done();
        });
    });

    it('should not login a user with incorrect password', (done) => {
      chai.request(server).
        post('/auth/login')
        .send({
          username: 'jeremy',
          password: 'johnson13',
        })
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(404);
          res.type.should.eql('application/json');
          res.body.status.should.eql('not found');
          done();
        });
    });
  });

  describe('POST /auth/logout', () => {
    it('should not be accessible when not logged in', (done) => {
      chai.request(server)
        .get('/auth/logout')
        .end((err, res) => {
          should.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
          res.body.status.should.eql('Please log in.');
          done();
        });
    });
  });

  describe('GET /user', () => {
    it('should throw an error when not logged in', (done) => {
      chai.request(server)
      .get('/user')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Please log in.');
        done();
      });
    });
  });
});
