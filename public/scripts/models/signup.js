'use strict';

const $signupForm = $('#sign-up');

$signupForm.on('submit', e => {
  const input = {};
  input.username = $('#input-name').val();
  input.password = $('#input-pass').val();
  input.roles = $('#input-roles').val();
  e.preventDefault();
  superagent
    .post('/lunch/auth/signup')
    .send(input)
    .end((err, res) => {
      localStorage.setItem('token', res.body.token);
      $('#token-dump').append(res.body.token);
      console.log('stored token: ', localStorage.getItem('token'));
    });
});

