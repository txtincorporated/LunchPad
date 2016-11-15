// 'use strict';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const assert = chai.assert;
// chai.use(chaiHttp);
// const app = require('../../lib/app');

// const request = chai.request(app);

// // describe('not authorized', () => {


// // });

// describe('user signup/signin', () => {

//   // const testUser = {
//   //   username: 'testUsername',
//   //   password: 'hunter2',
//   //   roles: ['user']
//   // };

//   function badRequest(url, send, error, done) {
//     request
//             .post(url)
//             .send(send)
//             .then(res => done('status should not be 200')) //eslint-disable-line
//             .catch(res => {
//               assert.equal(res.status, 400);
//               assert.equal(res.response.body.error, error);
//               done();
//             })
//             .catch(done);
//   }

//   it('requires username for signup', done => {
//     badRequest('/lunch/auth/signup', { password: 'hunter2' }, 'username and password required', done);
//   });

//   it('requires password for signup', done => {
//     badRequest('/lunch/auth/signup', { username: 'testUsername' }, 'username and password required', done);
//   });

// });