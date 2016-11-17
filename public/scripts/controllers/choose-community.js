'use strict';

const chooseCommunity = {};
const $joinCommunity = $('#join-community');

chooseCommunity.render = function() {
  $('#choose-community-div').show().siblings(':not(header)').hide();
};

$('#join-community').on('click', '.button', function() {
  $(this).removeClass('button-inert').siblings('.button').addClass('button-inert');
});

$joinCommunity.on('submit', e => {
  const input = {};
  const token = localStorage.getItem('token');
  input.name = $('#community-name').val();
  e.preventDefault();
  if($('#join-community>.button-inert').text() === 'Create a community'){
    superagent
      .post('/lunch/community/join')
      .set('authorization', token)
      .send(input)
      .end((err, res) => { //eslint-disable-line
        if(err) {
          $('#choose-community-div .error').html('&#9888; Community does not exist: make it!');
        }
        page(`/community/${res.body.communityId}`);
      });
  } else {
    superagent
      .post('/lunch/community/create')
      .set('authorization', token)
      .send(input)
      .end((err, res) => {
        if(err) {
          $('#choose-community-div .error').html('&#9888; Community already exists.');
        } else {
          page(`/community/${res.body.communityId}`);
        }
      });
  }
});