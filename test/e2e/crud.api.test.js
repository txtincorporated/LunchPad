'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');

const request = chai.request(app);

const user = {username: 'user', password:'password'};
const experience = {name:'restaurant', time: '12:00', howFast: 3, calledAhead: false, cost: 2, worthIt: 3, advice:'good food'};
describe('testing user endpoints', () => {
  it('should create a new user', done => {
    request
      .post('/lunch/auth/signup')
      .send(user)
      .then(res => {
        user.token = res.body.token;
        assert.isOk(res.body.token);
        done();
      })
      .catch(done);
  });


});

describe('testing community endpoints', () => {
  it('should create a new community', done => {
    request
      .post('/lunch/community/create')
      .set('authorization', user.token)
      .send({name: 'codefellows'})
      .then(res => {
        user.communityId = res.body.communityId;
        assert.isOk(res.body.communityId);
        done();
      })
      .catch(done);
  });
});

describe('testing experience endpoints', () => {
  it('should create a new experience', done => {
    request
      .post('/lunch/experiences')
      .set('authorization', user.token)
      .send(experience)
      .then(res => {
        experience._id = res.body._id;
        experience.__v = res.body.__v;
        experience.communityId = res.body.communityId;
        experience.userId = res.body.userId;
        assert.deepEqual(res.body, experience);
        done();
      })
      .catch(done);
  });
  

});