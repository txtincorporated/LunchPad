'use strict';

const $joinCommunity = $('#join-community');

$('#join-community').on('click', '.button', function() {
  $(this).removeClass('button-inert').siblings('.button').addClass('button-inert');

});

$joinCommunity.on('submit', e => {
  const input = {};
  const token = localStorage.getItem('token');
  input.name = $('#community-name').val();
  e.preventDefault();
  if($('.button-inert').text() !== 'Create a community'){
    superagent
      .post('/lunch/community')
      .set('authorization', token)
      .send(input)
      .end((err, res) => { //eslint-disable-line
        if(err) console.log(err);
        console.log('what is the community id', res);
        page(`/community/${res.body.communityId}`);
        
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
          page('/choose-community');
        }
      });
  }
});

