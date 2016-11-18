'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const app = require('../../lib/app');

const request = chai.request(app);

const user = {username: 'user', password:'password'};
const experience = {name:'restaurant', time: '12:00', howFast: 3, calledAhead: false, cost: 2, worthIt: 3, advice:'good food'};
const editExp = {name:'restaurant', time: '12:00', howFast: 3, calledAhead: false, cost: 2, worthIt: 3, advice:'try the fries!'};
const favUser = {username:'favUser', password:'password'};

describe('testing user endpoints', () => {

  before(done => {
    request
      .post('/lunch/auth/signup')
      .send(favUser)
      .then(res => {
        favUser.token = res.body.token;
        done();
      })
      .catch(done);
  });

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


  it('should add a user as a favorite', done => {
    request
      .put('/lunch/users/favorite')
      .set({'authorization': user.token})
      .send(favUser)
      .then(res => {
        assert.isOk(res.body.favoriteUsers.length > 0);
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

  it('should show community experiences', done => {
    request
      .get('/lunch/community/' + user.communityId)
      .set('authorization', user.token)
      .then(res => {
        assert.isArray(res.body);
        assert.isOk(res.body);
        done();
      })
      .catch(done);
  });
  
  it('should get selected user\'s experiences', done => {
    request
      .get('/lunch/experiences/' + user.username)
      .set('authorization', user.token)
      .then(res => {
        experience.postedOn = res.body[0].postedOn;
        console.log(res.body);
        experience.userId = res.body[0].userId;
        assert.deepEqual(res.body, [experience]);
        done();
      })
      .catch(done);
  });
  
  it('should update an existing experience', done => {
    request
      .put(`/lunch/experiences/${experience._id}`)
      .set('authorization', user.token)
      .send(editExp)
      .then(res => {
        editExp._id = res.body._id;
        editExp.__v = res.body.__v;
        editExp.communityId = res.body.communityId;
        editExp.userId = res.body.userId;
        assert.deepEqual(res.body, editExp);
        done();
      })
      .catch(done);
  });

});