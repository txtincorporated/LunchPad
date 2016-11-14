'use strict';

const request = require('superagent');
const $signupForm = $('#sign-up');

$signupForm.on('submit', e => {
  e.preventDefault();
  request
    .post('/lunch/auth/signup')
    .type('form')
    .end(res => {
      console.log(res);
      $('token-dump').append(res.body);
    });
});

