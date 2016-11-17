'use strict';

const authController = {};
const $signupForm = $('#sign-up');

authController.render = function() {
  $('#signup-signin-div').show().siblings(':not(header)').hide();
} ;

$('#sign-up').on('click', '.button', function() {
  $(this).removeClass('button-inert').siblings('.button').addClass('button-inert');
});

$signupForm.on('submit', e => {
  e.preventDefault();
  const input = {};
  input.username = $('#input-name').val();
  input.password = $('#input-pass').val();
  if($('#sign-up>.button-inert').text() === 'Sign in'){
    superagent
      .post('/lunch/auth/signup')
      .send(input)
      .end((err, res) => {
        if(err) {
          $('.error').text('Username already exists');
        } else {
          localStorage.setItem('token', res.body.token);
          page('/choose-community');
        }
      });
  } else {
    superagent
      .post('/lunch/auth/signin')
      .send(input)
      .end((err, res) => {
        if(err) {
          $('.error').text('incorrect username or password');
        } else {
          localStorage.setItem('token', res.body.token);
          if(res.body.communityId) {
            page('/community/' + res.body.communityId);
          } else {
            page('/choose-community');
          }
        }
      });
  }
});