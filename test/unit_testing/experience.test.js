'use strict';
const Experience = require('../../lib/models/experience');
const assert = require('chai').assert;

describe('Creates full Model for experiences', () => {
  it('should require name field', (done) => {
    const experience = new Experience({
      time: new Date(),
      howfast: 3,
      calledAhead: true,
    });

    experience.validate(err => {
      assert.isOk(err, 'name is required');
      done();
    });
  });

  it('should require time field', () => {
    const experience = new Experience({
      name: 'test user',
      howfast: 3,
      calledAhead: true,
    });

    experience.validate(err => {
      assert.isOk(err, 'time is required');
      done();
    });
  });
}

);