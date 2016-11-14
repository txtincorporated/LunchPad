'use strict';
const User = require('../../lib/models/user');
const assert = require('chai').assert;

describe('it creates a full user model', () => {
  it('should require the username field', done => {
    const user =  new User({
      password: 'test',
      roles: ['user']
    });

    user.validate(err => {
      assert.isOk(err, 'username is required');
      done();
    });
  });

  it('should require the password field', done => {
    const user =  new User({
      username: 'test',
      roles: ['user']
    });

    user.validate(err => {
      assert.isOk(err, 'password is required');
      done();
    });
  });

  it('should default the roles array to user', done => {
    const user =  new User({
      password: 'test',
      username: 'test user'
    });
    assert.isArray(user.roles);
    done();
  });
});
